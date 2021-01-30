import styled from "styled-components";

export const Loading = () => (
  <Container>
    <Spinner />
    <div>
      <h3>Loading.. (the blockchain is slow af)</h3>
    </div>
  </Container>
);

const Container = styled.div`
  display: inlight-flex;
  flex-direction: row;
  height: 250px;
  padding: 10px;
`;

const Spinner = () => (
  <div>
    <img style={{ width: "12px", height: "12px" }} src="/loading.gif"></img>
  </div>
);
