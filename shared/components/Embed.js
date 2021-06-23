import React, { useRef, useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { transitions } from "shared/utils/styles";

const Iframe = chakra(motion.iframe);

const Embed = ({ data, width, height, ...otherProps }) => {
  const iframeRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      iframeRef.current?.contentWindow?.postMessage(data, "*");
    }
  }, [data, loaded]);

  return (
    <Iframe
      ref={iframeRef}
      onLoad={() => setLoaded(true)}
      {...otherProps}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        width,
        height,
        transition: transitions.spring.normal,
      }}
    />
  );
};

export default Embed;
