import styled from "styled-components";
import { useState, useEffect } from "react";
import { clear } from "console";

export const Loading = () => {
  const msgs = [
    "Loading.. (the blockchain is slow af)",
    "The future takes time",
    "decentralized pirate radio",
    "I swear shits happening",
    "Radical Access Memories",
    "If you're seeing this after several messages...trust me, it's loading",
  ];

  const randMsg = () => msgs[Math.floor(Math.random() * msgs.length)];
  const [msg, setMsg] = useState(randMsg());

  useEffect(() => {
    const i = setInterval(() => setMsg(randMsg), 1000);
    return () => clearInterval(i);
  });

  return (
    <Container>
      <Spinner />
      <h3>{msg}</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 250px;
  padding: 10px;
`;

const Spinner = () => (
  <div>
    <img style={{ width: "12px", height: "12px" }} src="/loading.gif"></img>
  </div>
);
