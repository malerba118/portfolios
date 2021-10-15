import DEFAULT_THEME from "@chakra-ui/theme";
import { theme as CHAKRA_THEME } from "@chakra-ui/react";
import * as ant from "@ant-design/colors";

// Convert ant colors to chakra palette
const colorsToPalette = (colors) => ({
  50: colors[0],
  100: colors[1],
  200: colors[2],
  300: colors[3],
  400: colors[4],
  500: colors[5],
  600: colors[6],
  700: colors[7],
  800: colors[8],
  900: colors[9],
});

const generate = (color, { backgroundColor, theme = "light" } = {}) => {
  const colors = ant.generate(color, {
    theme,
    backgroundColor,
  });
  return colorsToPalette(colors);
};

export const invert = (palette) => ({
  50: palette[900],
  100: palette[800],
  200: palette[700],
  300: palette[600],
  400: palette[500],
  500: palette[400],
  600: palette[300],
  700: palette[200],
  800: palette[100],
  900: palette[50],
});

export const palettes = {
  desert: {
    primary: {
      50: "#fdefe7",
      100: "#f5e0d6",
      200: "#dcb7a2",
      300: "#cf957d",
      400: "#c16f59",
      500: "#a84f3f",
      600: "#833831",
      700: "#5e2423",
      800: "#391416",
      900: "#170103",
    },
  },
  ocean: {
    primary: DEFAULT_THEME.colors.twitter,
  },
  pink: {
    primary: DEFAULT_THEME.colors.pink,
  },
  gray: {
    primary: DEFAULT_THEME.colors.gray,
  },
  blackRed: {
    primary: generate(CHAKRA_THEME.colors.red[50], {
      backgroundColor: "#090909",
      theme: "dark",
    }),
    secondary: DEFAULT_THEME.colors.red,
  },
  purplePink: {
    primary: invert(DEFAULT_THEME.colors.purple),
    secondary: DEFAULT_THEME.colors.pink,
  },
  blueGreen: {
    primary: invert(DEFAULT_THEME.colors.blue),
    secondary: DEFAULT_THEME.colors.green,
  },
};

export const selectPalettes = (paletteNames) => {
  return paletteNames.map((name) => ({
    id: name,
    ...palettes[name],
  }));
};