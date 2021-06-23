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
  },
});

export default theme;
