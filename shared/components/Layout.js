import { Box, Flex, ChakraProvider } from "@chakra-ui/react";
import { useAuth } from "client/useAuth";
import { createTheme } from "shared/utils/editor-theme";
import FullscreenProvider from "./Fullscreen";

const Layout = ({ toolbar, content, fitWindow }) => {
  const user = useAuth();
  if (fitWindow) {
    return (
      <ChakraProvider theme={createTheme({ isAuthenticated: !!user })}>
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
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider theme={createTheme({ isAuthenticated: !!user })}>
      <FullscreenProvider>
        {toolbar}
        {content}
      </FullscreenProvider>
    </ChakraProvider>
  );
};

export default Layout;
