import { useMemo } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DateViewer = ({ startDate, endDate }) => {
  const d1 = useMemo(() => startDate && new Date(startDate), [startDate]);
  const d2 = useMemo(() => endDate && new Date(endDate), [endDate]);

  return (
    <HStack spacing={1}>
      {d1 && (
        <Box>
          <Text>
            {months[d1.getMonth()]}, {d1.getFullYear()}
          </Text>
        </Box>
      )}
      {d1 && d2 && <Box>-</Box>}
      {d2 && (
        <Box>
          <Text>
            {months[d2.getMonth()]}, {d2.getFullYear()}
          </Text>
        </Box>
      )}
    </HStack>
  );
};

export default DateViewer;
