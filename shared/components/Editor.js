import React from "react";
import { Flex, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "client/useAuth";
import Previewer from "./Previewer";
import * as styles from "../utils/styles";
import * as api from "client/api";

const Editor = () => {
  const user = useAuth();
  const query = useQuery("portfolio", api.portfolio.get);

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
      </Flex>
      <Flex flex={1} className="main" flexDirection="column">
        <Flex
          className="main-header"
          h="56px"
          {...styles.borders({ bottom: true })}
        ></Flex>
        <Flex flex={1} className="main-content" bg="gray.100">
          <Center h="100%" w="100%">
            <Previewer portfolio={query.data} />
          </Center>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Editor;
