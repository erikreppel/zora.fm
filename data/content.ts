import { useState, useEffect } from "react";
import { playableMedia, getTrack } from "./gql";
import { Media, Medias } from "./types";

export interface MediaPlayer {
  nextTrack: () => void;
  prevTrack: () => void;
  currentTrack?: Media;
  medias?: Medias;
  ready: boolean;
  trackIndex: number;
  setTrackIndex: (number) => void;
}

export function useMediaPlayer(): MediaPlayer {
  const [medias, setMedia] = useState<Medias | undefined>(undefined);
  const [index, setIndex] = useState<number>(0);
  const nextTrack = () =>
    index < medias.length ? setIndex(index + 1) : setIndex(0);
  const prevTrack = () => (index > 0 ? setIndex(index - 1) : setIndex(0));

  useEffect(() => {
    const fetchData = async () => {
      const playable = await playableMedia(false);
      setMedia(playable);
    };
    fetchData();
  }, []);

  const currentTrack = medias?.[index];
  const ready = currentTrack === undefined;
  const setTrackIndex = (idx: number) => setIndex(idx);
  return {
    currentTrack,
    nextTrack,
    prevTrack,
    ready,
    setTrackIndex,
    medias,
    trackIndex: index,
  };
}

export async function getTrackPlayer(trackId: string): Promise<Medias> {
  const track = await getTrack(trackId);
  const playable = await playableMedia(false);
  playable.unshift(track);
  return playable;
}
