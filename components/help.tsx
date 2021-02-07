import React from "react";
import styled from "styled-components";

const TooltipText = styled.div`
  width: 40px;
  text-align: center;
  line-height: 44px;
  margin-right: 15px;
  border-radius: 3px;
  cursor: pointer;
`;
const TooltipBox = styled.div`
  position: absolute;
  top: calc(100% - 10px);
  right: 30px;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  padding: 5px 5px;
  border-radius: 25px;
  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;
  &:before {
    content: "";
    width: 0;
    height: 0;
    left: 40px;
    top: -10px;
    position: absolute;
    border: 10px solid transparent;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
  }
`;
const TooltipCard = styled.div`
  position: relative;
  & ${TooltipText}:hover + ${TooltipBox} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 1);
    width: 230px;
    padding: 10px 15px;
  }
`;
export function Help() {
  return (
    <>
      <TooltipCard>
        <TooltipText>
          <h3>⁇</h3>
        </TooltipText>
        <TooltipBox>
          <p>
            zora.fm is internet pirate radio. All content has been minted by its
            creator as zNFTs using the zora protocol. 🌜🌞🌛.
          </p>
        </TooltipBox>
      </TooltipCard>
    </>
  );
}
