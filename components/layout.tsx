import styled from "styled-components";

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  padding: 5px;
  margin-left: 100px;
  margin-right: 100px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px;
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
