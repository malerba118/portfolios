import { extendTheme } from "@chakra-ui/react";
import * as ant from "@ant-design/colors";

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
      secondary: colorsToPalette(ant.generate("#317E82")),
      primary: colorsToPalette(ant.generate("#DB5858")),
    },
    fonts: {
      heading: "Josefin Sans",
      body: "Josefin Sans",
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
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
              backgroundBlendMode: "multiply",
              backgroundSize: "12%",
            },
      }),
    },
    components: {
      Button: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
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
        baseStyle: {},
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
            WebkitTextStroke: "1px currentColor",
            lineHeight: "140%",
            letterSpacing: ".05em",
            fontSize: {
              base: "xl",
              md: "3xl",
            },
          },
          "2xl": {
            WebkitTextStroke: "2px currentColor",
            lineHeight: 1.2,
            letterSpacing: ".05em",

            fontSize: {
              base: "2xl",
              md: "4xl",
            },
          },
          "3xl": {
            WebkitTextStroke: "3px currentColor",
            lineHeight: "120%",
            letterSpacing: ".05em",
            fontSize: {
              base: "3xl",
              md: "5xl",
            },
          },
          "4xl": {
            WebkitTextStroke: "3px currentColor",
            lineHeight: "120%",
            letterSpacing: ".05em",
            fontSize: {
              base: "4xl",
              md: "6xl",
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
