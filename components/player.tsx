import { useMediaPlayer, MediaPlayer } from "../data/content";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Playlist } from "./playlist";
import { WavyZorb } from "./zorb";
import { Row, Col } from "./layout";
import { ContentPlayer } from "./contentPlayer";
import { Loading } from "./loading";

const Button = styled.button`
  width: 50px;
  height: 50px;
`;

export const Player = () => {
  const mediaPlayer = useMediaPlayer();

  if (mediaPlayer.currentTrack === undefined) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Row>
        <Col>
          <ContentPlayer player={mediaPlayer} />
          <Row>
            <Button onClick={mediaPlayer.prevTrack}>⏮</Button>
            <Button onClick={mediaPlayer.nextTrack}>⏭</Button>
          </Row>
        </Col>
        <Col>
          <h2>Songs</h2>
          <Playlist player={mediaPlayer} />
        </Col>
      </Row>
    </div>
  );
};
