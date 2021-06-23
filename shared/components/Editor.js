import React, { useState } from "react";
import { Flex, Center, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "client/useAuth";
import Previewer from "./Previewer";
import DeviceSelector from "./DeviceSelector";
import PortfolioContentEditor from "./PortfolioContentEditor";
import { useResizeDetector } from "react-resize-detector";
import * as styles from "../utils/styles";
import * as api from "client/api";

const deviceAspectRatios = {
  phone: 9 / 16,
  tablet: 3 / 4,
  desktop: 16 / 9,
};

const Editor = () => {
  const user = useAuth();
  const query = useQuery("portfolio", api.portfolio.get);
  const [device, setDevice] = useState("desktop");
  const { width, height, ref } = useResizeDetector();

  const ratio = deviceAspectRatios[device];
  const previewerSize = {};
  if (width / height > ratio) {
    previewerSize.height = height * 0.88;
    previewerSize.width = previewerSize.height * ratio;
  } else {
    previewerSize.width = width * 0.88;
    previewerSize.height = previewerSize.width / ratio;
  }

  return (
    <Flex h="100%">
      <Flex
        className="sidebar"
        w="420px"
        flexDirection="column"
        {...styles.borders({ right: true })}
      >
        <Flex
          className="sidebar-header"
          h="56px"
          {...styles.borders({ bottom: true })}
        ></Flex>
        <Box className="sidebar-content" flex="1" overflow="auto">
          <PortfolioContentEditor />
        </Box>
      </Flex>
      <Flex flex={1} className="main" flexDirection="column">
        <Flex
          className="main-header"
          h="56px"
          {...styles.borders({ bottom: true })}
          justifyContent="center"
          alignItems="center"
        >
          <DeviceSelector value={device} onChange={setDevice} />
        </Flex>
        <Flex ref={ref} flex={1} className="main-content" bg="gray.100">
          <Center w="100%">
            <Previewer {...previewerSize} portfolio={query.data} />
          </Center>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Editor;
