import { request, gql } from "graphql-request";
import { Medias, Media } from "./types";

const contentQuery = gql`
  {
    medias(first: 1000, orderBy: createdAtTimestamp, orderDirection: desc) {
      contentURI
      metadataURI
      creator {
        id
      }
      owner {
        id
      }
      creatorBidShare
      createdAtTimestamp
    }
  }
`;

const getMedia = async () => {
  const data = await request(
    "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1",
    contentQuery
  );
  return data;
};

export async function playableMedia(): Promise<Medias> {
  const allMedia = await getMedia();
  console.log("total amount of media", allMedia.medias.length);
  const playable: Medias = [];

  for (let media of allMedia.medias) {
    try {
      const header = await fetch(media.contentURI, { method: "HEAD" });
      const contentType = header.headers.get("content-type");
      const metadata = await (await fetch(media.metadataURI)).json();
      metadata.mimeType = contentType;
      media.metadata = metadata;

      if (isPlayable(contentType)) {
        playable.push(media as Media);
      }
    } catch (err) {
      console.error("error getting playable media", err);
    }
  }
  return playable;
}

const isPlayable = (mimeType) => audioMimeTypes.includes(mimeType);

const audioMimeTypes = [
  "audio/mpeg",
  "video/mpeg",
  "video/ogg",
  "audio/wav",
  "audio/webm",
  "video/mp4",
];
