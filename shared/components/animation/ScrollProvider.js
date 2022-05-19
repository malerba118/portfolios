import React, { useRef, createContext, useContext, forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import {
  useViewportScroll,
  useElementScroll,
  useVelocity,
} from "framer-motion";

const ScrollContext = createContext(null);

// By using react context here, we can avoid spamming elements
// with scroll listeners every time we use a scroll hook.
export const ScrollProvider = {
  Window: ({ children, ...otherProps }) => {
    const { scrollX, scrollY, scrollXProgress, scrollYProgress } =
      useViewportScroll();
    const scroll = {
      offset: {
        position: {
          x: scrollX,
          y: scrollY,
        },
        velocity: {
          x: useVelocity(scrollX),
          y: useVelocity(scrollY),
        },
      },
      progress: {
        position: {
          x: scrollXProgress,
          y: scrollYProgress,
        },
        velocity: {
          x: useVelocity(scrollXProgress),
          y: useVelocity(scrollYProgress),
        },
      },
    };
    return (
      <ScrollContext.Provider value={scroll}>
        <Box {...otherProps}>{children}</Box>
      </ScrollContext.Provider>
    );
  },
  Box: forwardRef(({ children, style, ...otherProps }, ref) => {
    const { scrollX, scrollY, scrollXProgress, scrollYProgress } =
      useElementScroll(ref);
    const scroll = {
      offset: {
        position: {
          x: scrollX,
          y: scrollY,
        },
        velocity: {
          x: useVelocity(scrollX),
          y: useVelocity(scrollY),
        },
      },
      progress: {
        position: {
          x: scrollXProgress,
          y: scrollYProgress,
        },
        velocity: {
          x: useVelocity(scrollXProgress),
          y: useVelocity(scrollYProgress),
        },
      },
    };
    return (
      <ScrollContext.Provider value={scroll}>
        <Box
          {...otherProps}
          ref={ref}
          style={{ scrollBehavior: "smooth", ...style }}
        >
          {children}
        </Box>
      </ScrollContext.Provider>
    );
  }),
};

// Unified hook to consume scroll.
// This way when creating a common component, we don't have to decide
// whether it cares about the viewport scroll or a scpefic element's scroll.
// Instead, we defer that decision to the consumer who can wrap the component
// in the appropriate provider depending on the behavior they want.
export const useScroll = () => {
  return useContext(ScrollContext);
};
