import { MediaPlayer } from "../data/content";
import { Media } from "../data/types";
import styled from "styled-components";
import { nameOrAddress } from "../data/eth";
import { useEffect, useState } from "react";

const TrackContainer = styled.div`
  border-style: solid;
  border-color: black;
  padding: 5px;
  font-weight: ${(props) => (props.bold ? "800" : "normal")};
`;

const TrackLink = styled.a`
  cursor: crosshair;
`;

const PlaylistContainer = styled.div`
  overflow-y: auto;
  height: 83vh;
  padding: 4px;
  margin-top: 5px;
`;

export type PlaylistProps = { player: MediaPlayer };
export const Playlist = ({ player }: PlaylistProps) => {
  if (player.medias === undefined) return <div></div>;
  const fullNames = player.medias.map((m) => m.creator.id);
  const [artistNames, setArtistNames] = useState<string[]>(
    fullNames.map((n) => n.substring(0, 7))
  );

  // useEffect(() => {
  //   nameOrAddress(fullNames).then((r) => setArtistNames(r));
  // }, []);

  return (
    <PlaylistContainer>
      {player.medias.map((vibe, idx) => {
        return (
          <Track
            key={idx}
            media={vibe}
            player={player}
            idx={idx}
            artistName={artistNames[idx]}
          />
        );
      })}
    </PlaylistContainer>
  );
};

type TrackProps = {
  media: Media;
  player: MediaPlayer;
  idx: number;
  artistName: string;
};
const Track = ({ media, player, idx }: TrackProps) => {
  const [name, setName] = useState<string>(media.creator.id || "🎵🌞🎵");
  return (
    <TrackContainer bold={idx == player.trackIndex}>
      <TrackLink onClick={() => player.setTrackIndex(idx)}>
        {media.metadata.name || "untitled"} - {media.creator.displayName}
      </TrackLink>
    </TrackContainer>
  );
};
