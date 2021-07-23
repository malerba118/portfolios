import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Josefin Sans",
    body: "Josefin Sans",
  },
  styles: {
    global: ({ colorMode }) => ({
      _focusVisible: {
        boxShadow: "0 0 0 2px var(--chakra-colors-purple-300) !important",
        borderColor: "transparent !important",
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
          background: "purple.300",
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
        bgColor: "purple.400",
        textTransform: "capitalize",
      },
    },
    Tabs: {
      tab: {
        baseStyle: {
          _selected: {
            color: "purple.400",
            borderBottom: "2px solid",
            borderColor: "purple.400",
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

export default theme;
