import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ toolbar, content, fitWindow }) => {
  if (fitWindow) {
    return (
      <Flex flexDirection="column" h="100vh">
        {toolbar}
        <Box flex={1} overlow="auto">
          {content}
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
