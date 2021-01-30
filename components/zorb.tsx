import styled from "styled-components";
import { motion } from "framer-motion";

const rgbToCSS = (rgbArray: number[]) => `rgba(${rgbArray.join(",")})`;

export const WavyZorb = () => {
  const randn = (max) => Math.floor(Math.random() * max);
  const randz = () => [randn(256), randn(256), randn(256), Math.random()];

  let rgbs = [randz(), randz(), randz()];

  const Container = styled.div`
    width: 256px;
    height: 256px;
    border-radius: 100%;
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      ${(props) => rgbToCSS(props.rgbs[0])} 14.06%,
      ${(props) => rgbToCSS(props.rgbs[1])} 57.81%,
      ${(props) => rgbToCSS(props.rgbs[2])} 99.48%
    );
  `;

  return <Container rgbs={rgbs} />;
};
