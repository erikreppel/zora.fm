import { request, gql } from "graphql-request";

const contentQuery = gql`
  {
    medias(orderBy: createdAtTimestamp) {
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
  console.log(data);
  return data;
};

export const playableMedia = async () => {
  const allMedia = await getMedia();
  const playable = [];
  for (let media of allMedia.medias) {
    const metadata = await (await fetch(media.metadataURI)).json();
    media.metadata = metadata;
    if (isPlayable(metadata)) {
      playable.push(media);
    }
  }
  console.log(playable);
  return playable;
};

const isPlayable = (metadata) => audioMimeTypes.includes(metadata.mimeType);

const audioMimeTypes = [
  "audio/mpeg",
  "video/mpeg",
  "video/ogg",
  "audio/wav",
  "audio/webm",
];
