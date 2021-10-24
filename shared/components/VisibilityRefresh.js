import React, { useEffect, useState, useRef } from "react";
import { useEventListener } from "@chakra-ui/react";

const useDocumentVisibility = () => {
  const [visibilityState, setVisibilityState] = useState(
    document.visibilityState
  );

  useEventListener(
    "visibilitychange",
    () => {
      setVisibilityState(document.visibilityState);
    },
    document
  );

  return visibilityState;
};

const VisibilityRefresh = ({ idleThreshold = 1000 * 60 * 10, children }) => {
  const visibility = useDocumentVisibility();
  const lastSeenRef = useRef(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (visibility === "hidden") {
      lastSeenRef.current = Date.now();
    } else if (visibility === "visible") {
      if (Date.now() - lastSeenRef.current > idleThreshold) {
        setRefreshKey((prev) => prev + 1);
      }
    }
  }, [visibility]);

  useEffect(() => {
    console.log(refreshKey);
  }, [refreshKey]);

  return <React.Fragment key={refreshKey}>{children}</React.Fragment>;
};

export default VisibilityRefresh;
