import styled from "styled-components";
import { Media } from "../data/types";
import { utils } from "ethers";

type TrackDescriptionProps = { size: number; track: Media };
export const TrackDescription = ({ size, track }: TrackDescriptionProps) => {
  return (
    <Description size={size}>
      <div></div>
      <div>
        <h3>
          <i>"{track.metadata.description}"</i>
        </h3>
        <CreatorText>- {track?.creator.id || "loading.."}</CreatorText>
      </div>
      <ActionContainer>
        <ByContainer>
          <b>Created by:</b> {track?.creator.id}
        </ByContainer>
        <ByContainer>
          <b>Owned by:</b> {track?.owner.id}
        </ByContainer>
        <ButtonContainer>
          <BidButton media={track} />
        </ButtonContainer>
      </ActionContainer>
    </Description>
  );
};

type BidButtonProps = { media: Media };
const BidButton = ({ media }: BidButtonProps) => {
  const Button = styled.button`
    background: none;
    border-radius: 5px;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 700;
  `;

  const id = utils.getAddress(media.creator.id);

  const url = `https://zora.co/${id}/${media.id}/`;
  return (
    <a href={url} target="_blank">
      <Button>💰 Bid 💰</Button>
    </a>
  );
};

const ByContainer = styled.div`
  padding-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Description = styled.div`
  flex: ${(props) => props.size};
  background: ${(props) => props.theme.description};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
`;

const CreatorText = styled.div`
  font-size: 12px;
`;

const ActionContainer = styled.div``;
