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

export async function playableMedia(skipCache: boolean): Promise<Medias> {
  const allMedia = await getMedia();
  console.log("total amount of media", allMedia.medias.length);
  const playable: Medias = [];

  if (!skipCache) {
    const cachedMedias = getCached();
    if (cachedMedias !== null && !cachedMedias.stale) {
      return cachedMedias.medias;
    }
  }

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
  setCache(playable);
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

interface CachedMedias {
  medias: Medias;
  stale: boolean;
  timestamp: Date;
}

function setCache(medias: Medias) {
  const data = {
    medias: medias,
    timestamp: new Date(),
    stale: false,
  };

  if (typeof window === "undefined") return null;
  window.localStorage.setItem("media", JSON.stringify(data));
}

function getCached(): CachedMedias | null {
  if (typeof window === "undefined") return null;
  const cachedMedia = window.localStorage.getItem("media");
  if (cachedMedia === null) return null;

  const cached = JSON.parse(cachedMedia) as CachedMedias;
  console.log(cached);
  if (diffMinutes(new Date(cached.timestamp), new Date()) > 2) {
    cached.stale = true;
    window.localStorage.removeItem("media");
  }
  return cached;
}

function diffMinutes(d1: Date, d2: Date): number {
  return Math.abs(Math.round((d1.getTime() - d2.getTime()) / 1000 / 60));
}
