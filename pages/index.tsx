import Head from "next/head";
import styled from "styled-components";
import { Player } from "../components/player";

const Container = styled.div`
  height: 100vh;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="/favicon.ico" />
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
