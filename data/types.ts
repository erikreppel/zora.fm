export interface Media {
  metadata: MediaMetadata;
  contentURI: string;
  id: string;
  owner: User;
  creator: User;
  createdAtTimestamp: number;
  metadataURI: string;
  // currentAsk:
  // currentBid
}

export interface User {
  id: string;
  collection?: Media[];
  creations?: Media[];
  displayName: string;
  displayNameLong: string;
}

export interface MediaMetadata {
  name?: string;
  description?: string;
  mimeType?: string;
}

export interface Medias extends Array<Media> {}
