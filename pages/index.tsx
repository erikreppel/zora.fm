import Head from "next/head";
import styled from "styled-components";
import { Player } from "../components/player";
import { Row, Col } from "../components/layout";

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="https://twemoji.maxcdn.com/2/svg/1f31e.svg" />
      </Head>
      <Title>🎵🌞🎵</Title>
      <Row>
        <Player />
      </Row>
    </div>
  );
}
