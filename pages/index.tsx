import { useState, useEffect } from "react";
import Head from "next/head";
import { getMedia, playableMedia } from "../data/gql";

import styled from "styled-components";

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 5px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

const Media = ({ media, idx }) => {
  if (media === undefined) {
    return <h2>Loading...</h2>;
  }

  const vibe = media[idx];

  if (vibe.metadata.mimeType.split("/")[0] === "audio") {
    return (
      <div>
        <h3>
          {idx} of {media.length}
        </h3>
        <h4>{vibe.metadata.name || "untitled"}</h4>
        <h4>{vibe.metadata.description || "🎵🌞🎵"}</h4>
        <audio src={vibe.contentURI} autoPlay controls></audio>
      </div>
    );
  }
  if (vibe.metadata.mimeType.split("/")[0] === "video") {
    return (
      <div style={{ maxWidth: "800px", maxHeight: "auto" }}>
        <h3>
          `{idx} of {media.length}`
        </h3>
        <h4>{vibe.metadata.name || "untitled"}</h4>
        <h4>{vibe.metadata.description || "🎵🌞🎵"}</h4>
        <video
          style={{ maxWidth: "80%", maxHeight: "auto" }}
          src={vibe.contentURI}
          autoPlay
          controls
        ></video>
      </div>
    );
  }
  return <h1>Thats not a bop</h1>;
};

const Playlist = ({ media, idx }) => {
  if (media === undefined) return <div></div>;
  return (
    <div>
      {media.map((vibe) => (
        <h5>
          {vibe.metadata.name || "untitled"} - {vibe.creator.id || "🎵🌞🎵"}:{" "}
          {vibe.metadata.description} ({vibe.metadata.mimeType})
        </h5>
      ))}
    </div>
  );
};

export default function Home() {
  const [media, setMedia] = useState(undefined);
  const [idx, setIndex] = useState(0);

  const incIndex = () => (idx < media.length ? idx + 1 : 0);
  const decIndex = () => (idx > 0 ? idx - 1 : 0);

  useEffect(() => {
    const fetchData = async () => {
      const playable = await playableMedia();
      setMedia(playable);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="https://twemoji.maxcdn.com/2/svg/1f31e.svg" />
      </Head>
      <Row>
        <Col>
          <Media media={media} idx={idx} />
          <Row>
            <Button onClick={() => setIndex(decIndex())}>⏮</Button>
            <Button onClick={() => setIndex(incIndex())}>⏭</Button>
          </Row>
        </Col>
        <Col>
          <h2>Songs</h2>
          <Playlist media={media} idx={idx} />
        </Col>
      </Row>
    </div>
  );
}
