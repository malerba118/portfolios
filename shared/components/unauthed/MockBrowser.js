import { Box, HStack, Text, Flex } from "@chakra-ui/react";

const MockBrowser = ({ url, children, ...otherProps }) => {
  return (
    <Box boxShadow="md" borderRadius="md" overflow="hidden" {...otherProps}>
      <HStack
        className="mock-browser-navbar"
        px={2}
        h="32px"
        bg="purple.700"
        spacing={2}
      >
        <HStack>
          <Box h="10px" w="10px" borderRadius="6px" bg="red.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="orange.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="green.400" />
        </HStack>
        <Flex
          align="center"
          h="16px"
          px={1}
          bg="whiteAlpha.100"
          flex={1}
          borderRadius="sm"
        >
          <Text color="whiteAlpha.900" fontSize="10px" mt="1px">
            {url}
          </Text>
        </Flex>
      </HStack>
      <Box w="100%" bg="gray.100">
        {children}
      </Box>
    </Box>
  );
};

export default MockBrowser;
