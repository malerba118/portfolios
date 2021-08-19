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
    id: "red-orange",
    colors: {
      primary: "gray.100",
      secondary: "red.500",
      accent: "orange.400",
    },
  },
  {
    id: "desert",
    colors: {
      primary: "blue.800",
      secondary: "cyan.200",
      accent: "purple.200",
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
              <Box rounded="sm" h="24px" flex={1} bg={palette.colors.primary} />
              <Box
                rounded="sm"
                h="24px"
                flex={1}
                bg={palette.colors.secondary}
              />
              <Box rounded="sm" h="24px" flex={1} bg={palette.colors.accent} />
            </HStack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default PaletteSelector;
