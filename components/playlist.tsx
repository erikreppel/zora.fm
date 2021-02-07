import { MediaPlayer } from "../data/content";
import { Media } from "../data/types";
import styled from "styled-components";
import ENS from "@ensdomains/ensjs";
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
  return (
    <PlaylistContainer>
      {player.medias.map((vibe, idx) => {
        return <Track key={idx} media={vibe} player={player} idx={idx} />;
      })}
    </PlaylistContainer>
  );
};

type TrackProps = { media: Media; player: MediaPlayer; idx: number };
const Track = ({ media, player, idx }: TrackProps) => {
  const [name, setName] = useState<string>(media.creator.id || "🎵🌞🎵");

  // useEffect(() => {
  //   const searchName = async () => {
  //     const ens = new ENS();
  //     const ensName = await ens.getName(name);
  //     console.log("ENS name", ensName);
  //     if (ensName) setName(ensName);
  //   };
  //   searchName();
  // }, []);

  return (
    <TrackContainer bold={idx == player.trackIndex}>
      <TrackLink onClick={() => player.setTrackIndex(idx)}>
        {media.metadata.name || "untitled"} - {name.substring(0, 7)}
      </TrackLink>
    </TrackContainer>
  );
};
