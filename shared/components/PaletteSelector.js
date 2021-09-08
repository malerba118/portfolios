import { Stack, HStack, Box } from "@chakra-ui/react";
import { borders } from "shared/utils/styles";
import DEFAULT_THEME from "@chakra-ui/theme";

const PALETTES = [
  {
    id: "pink",
    colors: {
      primary: DEFAULT_THEME.colors.pink,
    },
  },
  {
    id: "ocean",
    colors: {
      primary: DEFAULT_THEME.colors.twitter,
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
