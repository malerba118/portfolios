import React, { useEffect, useMemo, useState } from "react";
import { Flex, Center, Box, Button } from "@chakra-ui/react";
import PortfolioContentEditor from "./PortfolioContentEditor";
import * as styles from "../utils/styles";
import { observer } from "mobx-react";
import { Tabs, TabList, Tab } from "./Tabs";
// import Templates from "./Templates";
import { useFullscreen } from "./Fullscreen";
import { MotionFlex, transitions } from "./animation";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("./Templates"), {
  ssr: false,
});

const tabs = ["content", "templates"];
const labels = {
  content: "Content",
  templates: "Templates",
};

const Sidebar = observer(({ portfolio }) => {
  const [selectedTab, setSelectedTab] = useState("content");
  const { fullscreen } = useFullscreen();

  return (
    <MotionFlex
      position="relative"
      className="sidebar"
      w="420px"
      animate={{
        marginLeft: fullscreen ? "-420px" : 0,
        transition: transitions.one(0.3),
      }}
      overflow="hidden"
      flexDirection="column"
      {...styles.borders({ right: true })}
    >
      <Flex
        className="sidebar-header"
        h="56px"
        {...styles.borders({ bottom: true })}
      >
        <Tabs
          index={tabs.indexOf(selectedTab)}
          onChange={(i) => setSelectedTab(tabs[i])}
          variant="unstyled"
        >
          <TabList h="100%">
            {tabs.map((tab) => (
              <Tab key={tab}>{labels[tab]}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
      <Box className="sidebar-content" flex="1" overflow="auto">
        {selectedTab === "content" && (
          <PortfolioContentEditor portfolio={portfolio.draft} />
        )}
        {selectedTab === "templates" && (
          <Templates portfolio={portfolio.draft} />
        )}
      </Box>
    </MotionFlex>
  );
});

export default Sidebar;
