import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ toolbar, content, fitWindow }) => {
  if (fitWindow) {
    return (
      <Flex flexDirection="column" h="100vh">
        {toolbar}
        <Box position="relative" flex={1}>
          <Box position="absolute" top="0" right="0" bottom="0" left="0">
            {content}
          </Box>
        </Box>
      </Flex>
    );
  }
  return (
    <>
      {toolbar}
      {content}
    </>
  );
};

export default Layout;
