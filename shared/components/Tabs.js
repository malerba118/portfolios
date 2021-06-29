import React from "react";
import {
  Tabs as CTabs,
  TabList as CTabList,
  Tab as CTab,
} from "@chakra-ui/react";

export const Tab = (props) => {
  return (
    <CTab
      color="gray.600"
      fontSize="sm"
      fontWeight="600"
      _selected={{
        color: "purple.400",
        borderBottom: "2px solid",
        borderColor: "purple.400",
        marginBottom: "-2px",
      }}
      _focus={{
        boxShadow: "none",
      }}
      {...props}
    />
  );
};

export const Tabs = CTabs;
export const TabList = CTabList;
