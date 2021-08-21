import { Stack, HStack, Box } from "@chakra-ui/react";
import { borders } from "shared/utils/styles";

const PALETTES = [
  {
    id: "blue-green",
    colors: {
      primary: "gray.200",
      secondary: "blue.400",
      accent: "green.500",
    },
  },
  {
    id: "ocean",
    colors: {
      primary: {
        50: "#edf7fb",
        100: "#bae9f2",
        200: "#94dce7",
        300: "#6dd1dd",
        400: "#47c8d2",
        500: "#2da6b8",
        600: "#1d7990",
        700: "#0d5067",
        800: "#002a3f",
        900: "#000e18",
      },
    },
  },
  {
    id: "desert",
    colors: {
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
  },
];

const PaletteSelector = ({ palettes = PALETTES, value, onChange }) => {
  return (
    <Stack>
      {palettes.map((palette, i) => {
        const isSelected = palette.id === value;
        return (
          <Box
            cursor="pointer"
            onClick={() => {
              onChange?.(palette?.id);
            }}
            key={i}
            p={2}
            rounded="md"
            {...borders({
              top: true,
              right: true,
              bottom: true,
              left: true,
              canSelect: true,
              isSelected,
            })}
            bg={isSelected ? "purple.50" : "white"}
          >
            <HStack>
              <Box
                rounded="sm"
                h="24px"
                flex={1}
                bg={palette.colors.primary[50]}
              />
              <Box
                rounded="sm"
                h="24px"
                flex={1}
                bg={palette.colors.primary[300]}
              />
              <Box
                rounded="sm"
                h="24px"
                flex={1}
                bg={palette.colors.primary[800]}
              />
            </HStack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default PaletteSelector;
