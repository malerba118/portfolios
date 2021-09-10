import React, { useRef, useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import { transitions } from "shared/utils/styles";

const Iframe = chakra(motion.iframe);

const Embed = ({
  data,
  width,
  height,
  scale = 1,
  debounce = 1000,
  ...otherProps
}) => {
  const iframeRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [debouncedData] = useDebounce(data, debounce);

  useEffect(() => {
    if (loaded) {
      iframeRef.current?.contentWindow?.postMessage(debouncedData, "*");
    }
  }, [debouncedData, loaded]);

  return (
    <Iframe
      ref={iframeRef}
      bg="white"
      {...otherProps}
      onLoad={() => setLoaded(true)}
      transform={`scale(${scale})`}
      transformOrigin="top left"
      initial={{
        width: `calc(${
          typeof width === "number" ? width + "px" : width
        } / ${scale})`,
        height: `calc(${
          typeof height === "number" ? height + "px" : height
        } / ${scale})`,
      }}
      animate={{
        width: `calc(${
          typeof width === "number" ? width + "px" : width
        } / ${scale})`,
        height: `calc(${
          typeof height === "number" ? height + "px" : height
        } / ${scale})`,
        transition: transitions.spring.normal,
      }}
    />
  );
};

export default Embed;
