import Head from "next/head";
import styled from "styled-components";
import { Player } from "../components/player";
import { Row, Col } from "../components/layout";

const Container = styled.div``;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="https://twemoji.maxcdn.com/2/svg/1f31e.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@programmer" />
        <meta name="twitter:title" content="zora.fm - 🎵🌞🎵" />
        <meta name="twitter:description" content="tune sun tune" />
        <meta name="twitter:image" content="https://zora.fm/zorafm.png" />
      </Head>
      <Player />
    </Container>
  );
}
