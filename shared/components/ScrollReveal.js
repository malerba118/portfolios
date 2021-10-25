import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Waypoint } from "react-waypoint";

const ScrollReveal = ({ children, persist = false, ...otherProps }) => {
  const [visible, setVisible] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  return (
    <Waypoint
      onEnter={(args) => {
        setVisible(true);
        setHasBeenSeen(true);
      }}
      onLeave={() => {
        setVisible(false);
      }}
    >
      <Box
        key={String(persist ? hasBeenSeen : visible)}
        visibility={visible ? "visible" : "hidden"}
        {...otherProps}
      >
        {children}
      </Box>
    </Waypoint>
  );
};

export default ScrollReveal;
