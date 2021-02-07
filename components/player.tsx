import { useMediaPlayer, MediaPlayer } from "../data/content";
import styled, { ThemeProvider } from "styled-components";

import { Playlist } from "./playlist";
import { ContentPlayer } from "./contentPlayer";
import { Loading } from "./loading";
import { useTheme } from "./themes";
import { TrackDescription } from "./trackDescription";
import { Help } from "./help";

export const Player = () => {
  const mediaPlayer = useMediaPlayer();
  const [theme, ThemePicker] = useTheme();
  if (mediaPlayer.currentTrack === undefined) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Flex>
        <Header>
          <Padding width="50px" />
          <Title>~ 🎵🌞🎵 ~</Title>
          <Help />
        </Header>
        <MainContainer>
          <ContentContainer size={3}>
            <ContentPlayer player={mediaPlayer} />
          </ContentContainer>
          <TrackDescription size={1} track={mediaPlayer.currentTrack} />
          <SongPane size={1}>
            <SongTitle />
            <Playlist player={mediaPlayer} />
          </SongPane>
        </MainContainer>
        <Footer>
          <div>
            <a href="https://github.com/erikreppel/zora.fm">src</a> |{" "}
            <a href="https://twitter.com/programmer">@programmer</a>
          </div>
          <ThemePicker />
        </Footer>
      </Flex>
    </ThemeProvider>
  );
};

const SongTitle = () => <h3 style={{ margin: "5px" }}>Up Next</h3>;

const SongPane = styled.aside`
  flex: ${(props) => props.size};
  background: ${(props) => props.theme.songPane};
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: ${(props) => props.size};
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${(props) => props.theme.contentContainer};
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.footer};
  padding-top: 5px;
  padding-botton: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.header};
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: ${(props) => props.theme.textColor};
`;

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // <- this
  justify-content: space-between;
  background: ${(props) => props.theme.contentContainer};
  flex-grow: 1;
`;

const Padding = styled.div`
  width: ${(props) => props.width};
`;
