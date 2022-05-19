import React from "react";
import { Box } from "@chakra-ui/react";
import { MotionBox } from "./chakra";

const Entrance = ({
  initialX = 0,
  initialY = 0,
  initialRotation = 0,
  initialOpacity = 1,
  initialScale = 1,
  overflow = "hidden",
  transition,
  damping = 115,
  delay = 0,
  children,
  ...otherProps
}) => (
  <Box overflow={overflow} {...otherProps}>
    <MotionBox
      layout
      initial={{
        x: initialX,
        y: initialY,
        opacity: initialOpacity,
        rotate: initialRotation,
        scale: initialScale,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { delay, type: "spring", damping, stiffness: 500 },
      }}
    >
      {children}
    </MotionBox>
  </Box>
);

export default Entrance;
