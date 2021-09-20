import React, { createContext, useContext, useMemo } from "react";
import { useEventListener } from "@chakra-ui/react";
import { useMotionValue, useVelocity } from "framer-motion";

// Track mouse position as motion values
const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEventListener("mousemove", (e) => {
    x.set(e.pageX);
    y.set(e.pageY);
  });

  return useMemo(
    () => ({
      x,
      y,
    }),
    [x, y]
  );
};

const MouseContext = createContext(null);

// By using react context here, we can avoid spamming window
// with mouse listeners every time we use a mouse hook.
export const MouseProvider = ({ children }) => {
  const { x, y } = useMousePosition();
  const mouse = {
    position: {
      x,
      y,
    },
    velocity: {
      x: useVelocity(x),
      y: useVelocity(y),
    },
  };
  return (
    <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
  );
};

export const useMouse = () => {
  return useContext(MouseContext);
};
