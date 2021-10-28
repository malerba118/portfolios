import React, { useEffect, useState, useRef } from "react";
import { useEventListener } from "@chakra-ui/react";

const useDocumentVisibility = () => {
  const [visibilityState, setVisibilityState] = useState({
    lastHiddenTimestamp: undefined,
    lastVisibleTimestamp: Date.now(),
    state: document.visibilityState,
  });

  useEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") {
        setVisibilityState((prev) => ({
          ...prev,
          lastHiddenTimestamp: Date.now(),
          state: document.visibilityState,
        }));
      } else if (document.visibilityState === "visible") {
        setVisibilityState((prev) => ({
          ...prev,
          lastVisibleTimestamp: Date.now(),
          state: document.visibilityState,
        }));
      } else {
        setVisibilityState((prev) => ({
          ...prev,
          state: document.visibilityState,
        }));
      }
    },
    document
  );

  return visibilityState;
};

const VisibilityRefresh = ({ idleThreshold = 1000 * 60 * 10 }) => {
  const visibility = useDocumentVisibility();
  useEffect(() => {
    if (
      visibility.state === "visible" &&
      visibility.lastVisibleTimestamp - visibility.lastHiddenTimestamp >
        idleThreshold
    ) {
      window.location.reload();
    }
  }, [visibility.state, idleThreshold]);

  return null;
};

export default VisibilityRefresh;
