import React, { useEffect, useMemo, useState } from "react";
import { Flex, Center, Box, Button } from "@chakra-ui/react";
import PortfolioContentEditor from "./PortfolioContentEditor";
import * as styles from "../utils/styles";
import { observer } from "mobx-react";
import { Tabs, TabList, Tab } from "./Tabs";

const tabs = ["content", "templates"];
const labels = {
  content: "Content",
  templates: "Templates",
};

const Sidebar = observer(({ portfolio }) => {
  const [selectedTab, setSelectedTab] = useState("content");

  return (
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
      >
        <Tabs
          index={tabs.indexOf(selectedTab)}
          onChange={(i) => setSelectedTab(tabs[i])}
          variant="unstyled"
        >
          <TabList h="100%">
            {tabs.map((tab) => (
              <Tab>{labels[tab]}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
      <Box className="sidebar-content" flex="1" overflow="auto">
        {selectedTab === "content" && (
          <PortfolioContentEditor portfolio={portfolio.draft} />
        )}
      </Box>
    </Flex>
  );
});

export default Sidebar;
