import { request, gql } from "graphql-request";
import { Medias, Media } from "./types";

const getMedia = async () => {
  const contentQuery = gql`
    {
      medias(first: 1000, orderBy: createdAtTimestamp, orderDirection: desc) {
        id
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
  const data = await request(
    "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1",
    contentQuery
  );
  return data;
};

const fetchMedia = async (media): Promise<Media[]> => {
  try {
    const header = await fetch(media.contentURI, { method: "HEAD" });
    const contentType = header.headers.get("content-type");
    if (!isPlayable(contentType)) {
      return [];
    }
    const metadata = await (await fetch(media.metadataURI)).json();
    metadata.mimeType = contentType;
    media.metadata = metadata;

    return [media];
  } catch (err) {
    return [];
  }
};

export async function playableMedia(skipCache: boolean): Promise<Medias> {
  const allMedia = await getMedia();
  console.log("total amount of media", allMedia.medias.length);

  if (!skipCache) {
    const cachedMedias = getCached();
    if (cachedMedias !== null && !cachedMedias.stale) {
      return cachedMedias.medias;
    }
  }

  const playable = (
    await Promise.all(allMedia.medias.map((media) => fetchMedia(media)))
  ).reduce((acc: Media[], curr: Media[]) => [...acc, ...curr], []);

  setCache(playable as Media[]);
  return playable as Medias;
}

export async function getTrack(trackId: string): Promise<Media> {
  const endpoint = "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1";

  const query = gql`
    {
      media(id: ${trackId}) {
        id
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

  // console.log("variables", variables);
  const data = await request(endpoint, query);
  const media = await fetchMedia(data.media);
  return media[0] as Media;
}

const isPlayable = (mimeType) =>
  audioMimeTypes.includes(mimeType.split("/")[0]);

const audioMimeTypes = ["audio", "video"];

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
