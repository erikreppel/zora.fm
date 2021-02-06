import { WavyZorb } from "./zorb";
import { MediaPlayer } from "../data/content";
import { Media } from "../data/types";
import styled from "styled-components";

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 48px;
  padding: 0;
  border: none;
  background: none;
`;

type ControlsProps = { prevTrack: () => void; nextTrack: () => void };
const Controls = ({ prevTrack, nextTrack }: ControlsProps) => {
  const ControlContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px;
  `;

  return (
    <ControlContainer>
      <Button onClick={prevTrack}>⏮</Button>
      <Button>🌞</Button>
      <Button onClick={nextTrack}>⏭</Button>
    </ControlContainer>
  );
};

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 80vh;
`;

type ContentPlayerProps = { player: MediaPlayer };
export const ContentPlayer = ({ player }: ContentPlayerProps) => {
  const track = player.currentTrack!;
  if (isAudio(track)) {
    return (
      <PlayerContainer>
        <WavyZorb />
        <h3>{track.metadata.name || "untitled"}</h3>
        <audio
          src={track.contentURI}
          autoPlay
          controls
          onEnded={() => waitThen(100, player.nextTrack)}
        ></audio>
        <Controls prevTrack={player.prevTrack} nextTrack={player.nextTrack} />
        <BidButton media={track} />
      </PlayerContainer>
    );
  }
  if (isVideo(track)) {
    return (
      <PlayerContainer>
        <video
          style={{ width: "70%", height: "70%", maxHeight: "70vh" }}
          src={track.contentURI}
          autoPlay
          controls
          onEnded={() => waitThen(100, player.nextTrack)}
        ></video>
        <h3>{track.metadata.name || "untitled"}</h3>
        <Controls prevTrack={player.prevTrack} nextTrack={player.nextTrack} />
        <BidButton media={track} />
      </PlayerContainer>
    );
  }
  return <h1>Thats not a bop</h1>;
};

const isAudio = function (track): boolean {
  return track.metadata.mimeType.split("/")[0] === "audio";
};
const isVideo = function (track): boolean {
  return track.metadata.mimeType.split("/")[0] === "video";
};

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
async function waitThen(ms: number, fn: () => void) {
  await sleep(ms);
  fn();
}

type BidButtonProps = { media: Media };
const BidButton = ({ media }: BidButtonProps) => {
  const Button = styled.button`
    background: none;
    border-radius: 5px;
    font-size: 18px;
    margin: 15px;
    font-weight: 800;
  `;
  const url = `https://zora.co/${media.owner.id}/${media.id}/`;
  return (
    <a href={url} target="_blank">
      <Button>💵 Bid 💵</Button>
    </a>
  );
};
