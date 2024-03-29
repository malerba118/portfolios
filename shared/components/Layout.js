import { Box, Flex } from "@chakra-ui/react";
import FullscreenProvider from "./Fullscreen";

const Layout = ({ toolbar, content, fitWindow }) => {
  if (fitWindow) {
    return (
      <FullscreenProvider>
        <Flex flexDirection="column" h="var(--app-height)">
          {toolbar}
          <Box position="relative" flex={1}>
            <Box position="absolute" top="0" right="0" bottom="0" left="0">
              {content}
            </Box>
          </Box>
        </Flex>
      </FullscreenProvider>
    );
  }
  return (
    <FullscreenProvider>
      {toolbar}
      {content}
    </FullscreenProvider>
  );
};

export default Layout;
