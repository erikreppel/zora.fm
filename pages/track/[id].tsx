import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Player } from "../../components/player";
import {
  useMediaPlayer,
  getTrackPlayer,
  MediaPlayer,
} from "../../data/content";
import { getTrack } from "../../data/gql";
import { Media, Medias } from "../../data/types";

import { Loading } from "../../components/loading";

const Container = styled.div`
  height: 100vh;
`;

type TrackProps = { medias: Medias };
export default function Track({ medias }: TrackProps) {
  const [index, setIndex] = useState<number>(0);
  const nextTrack = () =>
    index < medias.length ? setIndex(index + 1) : setIndex(0);
  const prevTrack = () => (index > 0 ? setIndex(index - 1) : setIndex(0));

  const currentTrack = medias?.[index];
  const ready = currentTrack === undefined;
  const setTrackIndex = (idx: number) => setIndex(idx);
  const player = {
    currentTrack,
    nextTrack,
    prevTrack,
    ready,
    setTrackIndex,
    medias,
    trackIndex: index,
  };

  return (
    <Container>
      <Head>
        <title>zora.fm - tune sun tune</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@programmer" />
        <meta
          name="twitter:title"
          content={`zora.fm - ${currentTrack.metadata.name}`}
        />
        <meta
          name="twitter:description"
          content={`${currentTrack.metadata.description}`}
        />
        <meta name="twitter:image" content="https://zora.fm/zorafm.png" />
      </Head>
      <Player mediaPlayer={player} />
    </Container>
  );
}

Track.getInitialProps = async (ctx) => {
  // const router = useRouter();
  const { id } = ctx.query;
  const medias = await getTrackPlayer(id as string);
  console.log(medias);
  return { medias };
};
