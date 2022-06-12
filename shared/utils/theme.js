import { extendTheme } from "@chakra-ui/react";
import * as ant from "@ant-design/colors";
import "@fontsource/dm-sans"; // Defaults to weight 400.

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

export const createTheme = ({ isAuthenticated }) => {
  const theme = extendTheme({
    // colors: {
    //   secondary: colorsToPalette(ant.generate("#489CA5")),
    //   primary: colorsToPalette(ant.generate("#DB5858")),
    // },
    colors: {
      pink: {
        50: "#ffe4fa",
        100: "#feb3ea", //use this one
        200: "#fb82dc",
        300: "#fb53ce",
        400: "#f928bf",
        500: "#e018a6",
        600: "#ae0f81",
        700: "#7d085c",
        800: "#4c0138",
        900: "#1c0015",
      },
      blue: {
        50: "#e2ecff",
        100: "#b1c5ff",
        200: "#809efe",
        300: "#4f77fd",
        400: "#1f50fb",
        500: "#0936e2",
        600: "#022ab0",
        700: "#001e7f",
        800: "#00124f",
        900: "#00061f",
      },
      orange: {
        50: "#ffe6e0",
        100: "#ffbdb1",
        200: "#ff927f",
        300: "#ff674d",
        400: "#fe3d1b",
        500: "#e52401",
        600: "#b31b00",
        700: "#811200",
        800: "#4f0800",
        900: "#200000",
      },
      green: {
        50: "#dafff7",
        100: "#adffea",
        200: "#7effdc",
        300: "#4dffce",
        400: "#24ffc1",
        500: "#11e6a7",
        600: "#00b382",
        700: "#00805d",
        800: "#004e37",
        900: "#001c12",
      },
      yellow: {
        50: "#fffadb",
        100: "#ffefaf",
        200: "#ffe57e",
        300: "#ffda4d",
        400: "#ffd01e",
        500: "#e6b607",
        600: "#b38e00",
        700: "#806500",
        800: "#4d3d00",
        900: "#1d1400",
      },
      gray: {
        50: "#f2f2f2",
        100: "#d9d9d9",
        200: "#bfbfbf",
        300: "#a6a6a6",
        400: "#8c8c8c",
        500: "#737373",
        600: "#595959",
        700: "#404040",
        800: "#262626",
        900: "#0d0d0d",
      },
      secondary: {
        50: "#eaf0f1",
        100: "#cad8dc",
        200: "#a6bfc4",
        300: "#82a5ac",
        400: "#68919b",
        500: "#4d7e89",
        600: "#3e6a75",
        700: "#335c66",
        800: "#2a505a",
        900: "#1d3d46",
      },
      primary: colorsToPalette(ant.generate("#DB7058")),
    },
    fonts: {
      heading: "screamer",
      body: "DM Sans",
    },
    styles: {
      global: ({ colorMode }) => ({
        _focusVisible: {
          boxShadow: "0 0 0 2px var(--chakra-colors-secondary-300) !important",
          borderColor: "transparent !important",
        },
        body: isAuthenticated
          ? {}
          : {
              backgroundColor: "var(--chakra-colors-primary-50)",
              // backgroundImage:
              //   'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
              // backgroundBlendMode: "multiply",
              // backgroundSize: "12%",
            },
      }),
    },
    components: {
      Button: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
          borderRadius: "20px",
        },
        variants: {
          solid: (props) => ({
            px: 8,
            bg: `${props.colorScheme}.100`,
            color: "black",
            _hover: {
              bg: `${props.colorScheme}.200`,
            },
          }),
        },
      },
      IconButton: {
        variants: {
          active: {
            bg: "secondary.300",
            color: "white",
          },
        },
      },
      Input: {
        baseStyle: {
          field: {
            borderWidth: "2px !important",
          },
        },
      },
      Textarea: {
        baseStyle: {
          borderWidth: "2px !important",
        },
      },
      Tooltip: {
        baseStyle: {
          bgColor: "secondary.400",
          textTransform: "capitalize",
        },
      },
      Heading: {
        baseStyle: {
          fontWeight: 400,
        },
        sizes: {
          "2xs": {
            lineHeight: "140%",
            fontSize: {
              base: "sm",
              md: "sm",
            },
          },
          xs: {
            lineHeight: "140%",
            fontSize: {
              base: "xs",
              md: "md",
            },
          },
          sm: {
            lineHeight: "140%",
            fontSize: {
              base: "sm",
              md: "lg",
            },
          },
          md: {
            lineHeight: "140%",
            fontSize: {
              base: "md",
              md: "xl",
            },
          },
          lg: {
            lineHeight: "140%",
            fontSize: {
              base: "lg",
              md: "2xl",
            },
          },
          xl: {
            // WebkitTextStroke: "1px currentColor",
            lineHeight: "140%",
            fontSize: {
              base: "xl",
              md: "3xl",
            },
          },
          "2xl": {
            // WebkitTextStroke: "2px currentColor",
            lineHeight: 1.2,
            fontSize: {
              base: "2xl",
              md: "4xl",
            },
          },
          "3xl": {
            // WebkitTextStroke: "3px currentColor",
            lineHeight: "120%",
            fontSize: {
              base: "3xl",
              md: "5xl",
            },
          },
          "4xl": {
            // WebkitTextStroke: "4px currentColor",
            lineHeight: "120%",
            fontSize: {
              base: "4xl",
              md: "6xl",
            },
          },
          "5xl": {
            // WebkitTextStroke: "4px currentColor",
            lineHeight: "120%",
            fontSize: {
              base: "5xl",
              md: "7xl",
            },
          },
          "6xl": {
            // WebkitTextStroke: "4px currentColor",
            lineHeight: "120%",
            fontSize: {
              base: "6xl",
              md: "8xl",
            },
          },
          "7xl": {
            // WebkitTextStroke: "4px currentColor",
            lineHeight: "120%",
            fontSize: {
              base: "7xl",
              md: "9xl",
            },
          },
        },
        defaultProps: {
          size: "md",
        },
      },
      Tabs: {
        tab: {
          baseStyle: {
            _selected: {
              color: "secondary.400",
              borderBottom: "2px solid",
              borderColor: "secondary.400",
              marginBottom: "-2px",
            },
            _focus: {
              boxShadow: "none",
            },
          },
        },
      },
    },
  });

  return theme;
};
