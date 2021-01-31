import { visitWithTypeInfo } from "graphql";
import styled from "styled-components";

export const colorWay = {
  iconColor: "tomato",
  songPane: "lightgreen",
  contentContainer: "orange",
  footer: "lightblue",
  description: "hotpink",
  mainContainer: "lightgreen",
  header: "tomato",
  textColor: "black",
};

export const night = {
  iconColor: "#181818",
  songPane: "#121212",
  contentContainer: "#181818",
  footer: "#15202B",
  description: "#121212",
  mainContainer: "#181818",
  header: "#282828",
  textColor: "#e6e4e1",
};

export const light = {
  iconColor: "#ffffff",
  songPane: "#ffffff",
  contentContainer: "#ffffff",
  footer: "#ffffff",
  description: "#ffffff",
  mainContainer: "#ffffff",
  header: "#ffffff",
  textColor: "#22303C",
};

export interface theme {
  iconColor: string;
  songPane: string;
  contentContainer: string;
  footer: string;
  description: string;
  mainContainer: string;
  header: string;
  textColor: string;
}

export const ThemeButton = styled.button`
  margin: 3px;
  padding: 0;
  background-color: ${(props) => props.theme.iconColor};
  border-color: ${(props) => props.theme.header};
  border-width: 2px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;
