import * as themes from "../data/themes";
import React, { useState } from "react";
import styled from "styled-components";

const ThemeContainer = styled.div`
  display: flex;
  padding: 4px;
`;

export function useTheme(): [themes.theme, React.FC] {
  const [theme, setTheme] = useState<themes.theme>(themes.colorWay);

  const ThemePicker = () => (
    <ThemeContainer>
      themes:
      <themes.ThemeButton
        theme={themes.colorWay}
        onClick={() => setTheme(themes.colorWay)}
      />
      <themes.ThemeButton
        theme={themes.night}
        onClick={() => setTheme(themes.night)}
      />
      <themes.ThemeButton
        theme={themes.light}
        onClick={() => setTheme(themes.light)}
      />
    </ThemeContainer>
  );

  return [theme, ThemePicker];
}
