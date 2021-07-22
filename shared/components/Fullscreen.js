import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { chakra, useEventListener } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import { transitions } from "shared/utils/styles";

const FullscreenContext = createContext(null);

export const FullscreenProvider = ({ children }) => {
  const [fullscreen, setFullscreen] = useState(false);

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setFullscreen(false);
    }
  });

  const api = useMemo(
    () => ({
      fullscreen,
      setFullscreen,
    }),
    [fullscreen, setFullscreen]
  );

  return (
    <FullscreenContext.Provider value={api}>
      {children}
    </FullscreenContext.Provider>
  );
};

export const useFullscreen = () => {
  const api = useContext(FullscreenContext);
  if (!api) {
    throw new Error("useFullscreen must be used inside of FullscreenProvider");
  }
  return api;
};

export default FullscreenProvider;
