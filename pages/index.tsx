import Head from "next/head";
import styled from "styled-components";
import { Player } from "../components/player";
import { Row, Col } from "../components/layout";

const Title = styled.h1`
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 10px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="https://twemoji.maxcdn.com/2/svg/1f31e.svg" />
        <meta name="twitter:site" content="@programmer" />
        <meta name="twitter:title" content="zora.fm - 🎵🌞🎵" />
        <meta name="twitter:description" content="tune sun tune" />
        <meta name="twitter:image" content="https://zora.fm/zorafm.png" />
      </Head>
      <Title>🎵🌞🎵</Title>
      <Row>
        <Player />
      </Row>
      <Footer>
        <a href="https://github.com/erikreppel/zora.fm">src</a> |{" "}
        <a href="https://twitter.com/programer">@programmer</a>
      </Footer>
    </div>
  );
}
