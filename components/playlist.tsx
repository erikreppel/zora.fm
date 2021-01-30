import { MediaPlayer } from "../data/content";
import styled from "styled-components";

const TrackContainer = styled.div`
  border-style: solid;
  padding: 5px;
  font-weight: ${(props) => (props.bold ? "800" : "normal")};
`;

const TrackLink = styled.a`
  cursor: crosshair;
`;

const PlaylistContainer = styled.div`
  overflow-y: auto;
  height: 50%;
`;

export type PlaylistProps = { player: MediaPlayer };
export const Playlist = ({ player }: PlaylistProps) => {
  if (player.medias === undefined) return <div></div>;
  return (
    <PlaylistContainer>
      {player.medias.map((vibe, idx) => {
        return (
          <TrackContainer bold={idx == player.trackIndex}>
            <TrackLink onClick={() => player.setTrackIndex(idx)}>
              {vibe.metadata.name || "untitled"} - {vibe.creator.id || "🎵🌞🎵"}
            </TrackLink>
          </TrackContainer>
        );
      })}
    </PlaylistContainer>
  );
};
