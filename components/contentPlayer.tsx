import { WavyZorb } from "./zorb";
import { MediaPlayer } from "../data/content";
import styled from "styled-components";

type ContentPlayerProps = { player: MediaPlayer };
export const ContentPlayer = ({ player }: ContentPlayerProps) => {
  const track = player.currentTrack!;
  if (isAudio(track)) {
    return (
      <div>
        <WavyZorb />
        <h3>{track.metadata.name || "untitled"}</h3>
        <p>{track.metadata.description || "🎵🌞🎵"}</p>
        <audio
          src={track.contentURI}
          autoPlay
          controls
          onEnded={() => waitThen(100, player.nextTrack)}
        ></audio>
      </div>
    );
  }
  if (isVideo(track)) {
    return (
      <div style={{ maxWidth: "800px", maxHeight: "800px" }}>
        <video
          style={{ maxWidth: "80%", maxHeight: "auto" }}
          src={track.contentURI}
          autoPlay
          controls
          onEnded={() => waitThen(100, player.nextTrack)}
        ></video>
      </div>
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
