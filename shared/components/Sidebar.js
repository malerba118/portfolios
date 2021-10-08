import React, { useEffect, useMemo, useState } from "react";
import { Flex, Text, Box, Stack, Center } from "@chakra-ui/react";
import PortfolioContentEditor from "./PortfolioContentEditor";
import * as styles from "../utils/styles";
import { observer } from "mobx-react";
import { Tabs, TabList, Tab } from "./Tabs";
import Templates from "./Templates";
import { useFullscreen } from "./Fullscreen";
import { MotionFlex, transitions } from "./animation";
import TimeAgoBase from "react-timeago";

const TimeAgo = React.memo(TimeAgoBase);

const tabs = ["content", "templates"];
const labels = {
  content: "Content",
  templates: "Templates",
};

const formatter = (value, unit, suffix) => {
  if (value === 0) {
    return "just now";
  }
  return `${value} ${unit} ${suffix}`;
};

const Sidebar = observer(({ portfolio, lastSaved }) => {
  const [selectedTab, setSelectedTab] = useState("content");
  const { fullscreen } = useFullscreen();
  const [lastSavedState, setLastSavedState] = useState(lastSaved);

  // mutation seems to be setting data to undefined at some point
  // this is a hacky workaround, but should figure it out for real
  // some time
  useEffect(() => {
    if (lastSaved) {
      setLastSavedState(lastSaved);
    }
  }, [lastSaved]);

  return (
    <MotionFlex
      position="relative"
      className="sidebar"
      w="420px"
      minW="420px"
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
        justifyContent="space-between"
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
        <Center h="100%" px={4}>
          {lastSavedState && (
            <Stack spacing={0}>
              <Text
                fontWeight={600}
                textAlign="center"
                fontSize="xs"
                color="gray.400"
              >
                Last saved
              </Text>
              <Text
                fontWeight={600}
                textAlign="center"
                fontSize="xs"
                color="gray.400"
              >
                <TimeAgo
                  minPeriod={30}
                  live={true}
                  date={lastSavedState}
                  formatter={formatter}
                />
              </Text>
            </Stack>
          )}
        </Center>
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
