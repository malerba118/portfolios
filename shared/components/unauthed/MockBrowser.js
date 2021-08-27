import Link from "next/link";
import { Avatar, Box, HStack, AspectRatio } from "@chakra-ui/react";
import * as styles from "../../utils/styles";
import { MotionFlex, transitions } from "../animation";

const MockBrowser = ({ children, ...otherProps }) => {
  return (
    <Box borderRadius="md" overflow="hidden" {...otherProps}>
      <HStack className="mock-browser-navbar" px={2} h="32px" bg="gray.200">
        <HStack>
          <Box h="10px" w="10px" borderRadius="6px" bg="red.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="orange.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="green.400" />
        </HStack>
        <Box h="24px" bg="blackAlpha.200" borderRadius="md"></Box>
      </HStack>
      <Box w="100%" bg="gray.100">
        {children}
      </Box>
    </Box>
  );
};

export default MockBrowser;
