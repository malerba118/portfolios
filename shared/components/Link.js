import { Box } from "@chakra-ui/react";
import React from "react";
import { MotionLink, MotionBox } from "./animation";

const variants = {
  link: {
    initial: {},
    hovered: {},
  },
  underline: {
    initial: {
      width: 0,
    },
    hovered: {
      width: "100%",
    },
  },
};

const Link = ({ children, color = "white", ...otherProps }) => {
  return (
    <MotionLink
      pos="relative"
      variants={variants.link}
      whileHover={"hovered"}
      _hover={{
        textDecoration: "none",
      }}
      color={color}
      {...otherProps}
    >
      <Box>
        {children}
        <MotionBox
          variants={variants.underline}
          layout
          pos="absolute"
          bottom={"-1px"}
          background={color}
          height="2px"
          transition={{
            type: "spring",
            mass: 0.1,
            stiffness: 110,
            damping: 10,
          }}
        />
      </Box>
    </MotionLink>
  );
};

export default Link;
