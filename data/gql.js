import { request, gql } from "graphql-request";

const contentQuery = gql`
  {
    medias(orderBy: createdAtTimestamp, orderDirection: desc) {
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

export const getMedia = async () => {
  const data = await request(
    "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1",
    contentQuery
  );
  return data;
};

export const playableMedia = async () => {
  const allMedia = await getMedia();
  const playable = [];
  for (let media of allMedia.medias) {
    try {
      const header = await fetch(media.contentURI, { method: "HEAD" });
      const contentType = header.headers.get("content-type");
      const metadata = await (await fetch(media.metadataURI)).json();
      metadata.mimeType = contentType;
      media.metadata = metadata;
      if (isPlayable(contentType)) {
        playable.push(media);
      }
    } catch (err) {
      console.error("error getting playable media", err);
    }
  }
  return playable;
};

const isPlayable = (mimeType) => audioMimeTypes.includes(mimeType);

const audioMimeTypes = [
  "audio/mpeg",
  "video/mpeg",
  "video/ogg",
  "audio/wav",
  "audio/webm",
  "video/mp4",
];
