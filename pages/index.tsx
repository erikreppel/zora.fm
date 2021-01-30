import { useState, useEffect } from "react";
import Head from "next/head";
import { getMedia, playableMedia } from "../data/gql";

const Media = ({ media, idx }) => {
  if (media === undefined) {
    return <h2>Loading...</h2>;
  }

  const vibe = media[idx];

  if (vibe.metadata.mimeType.split("/")[0] === "audio") {
    return (
      <div>
        <h4>{vibe.metadata.name || "untitled"}</h4>
        <h4>{vibe.metadata.description || "🎵🌞🎵"}</h4>
        <audio src={vibe.contentURI} autoPlay></audio>
      </div>
    );
  }
  if (vibe.metadata.mimeType.split("/")[0] === "video") {
    return (
      <div>
        <h2>vibin to tv</h2>
        <video src={vibe.contentURI} autoPlay></video>
      </div>
    );
  }
  return <h1>Thats not a bop</h1>;
};

export default function Home() {
  const [media, setMedia] = useState(undefined);
  const [idx, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const playable = await playableMedia();
      setMedia(playable);
    };
    fetchData();
  }, []);

  console.log(media);

  return (
    <div>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Media media={media} idx={idx} />
      <button onClick={() => setIndex(idx + 1)}>⏮</button>
      <button onClick={() => setIndex(idx + 1)}>⏭</button>
    </div>
  );
}
