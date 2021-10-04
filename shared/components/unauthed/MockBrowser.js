import { Box, HStack, Text, Flex, Button, Icon } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import NextLink from "next/link";

const MockBrowser = ({ url, children, ...otherProps }) => {
  return (
    <Box boxShadow="md" borderRadius="md" overflow="hidden" {...otherProps}>
      <HStack
        className="mock-browser-navbar"
        px={2}
        h="32px"
        bg="secondary.900"
        spacing={2}
      >
        <HStack>
          <Box h="10px" w="10px" borderRadius="6px" bg="red.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="orange.400" />
          <Box h="10px" w="10px" borderRadius="6px" bg="green.400" />
        </HStack>
        <Flex
          align="center"
          h="20px"
          px={1}
          bg="whiteAlpha.200"
          flex={1}
          borderRadius="sm"
        >
          <Text color="whiteAlpha.900" fontSize="11px" mt="1px">
            {url}
          </Text>
        </Flex>
        <NextLink href="/login">
          <Button rounded="sm" h="20px" size="xs" colorScheme="primary">
            <HStack>
              <span>Start for Free</span>
              <BsArrowRight />
            </HStack>
          </Button>
        </NextLink>
      </HStack>
      {children}
    </Box>
  );
};

export default MockBrowser;
