import { motion } from "framer-motion";
import Image from "next/image";
import { Box, Icon, Center } from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

const defaultChildren = (status) => {
  return (
    <>
      {status === "errored" && (
        <Box
          pos="absolute"
          inset={0}
          pointerEvents="none"
          bg="gray.100"
          rounded="md"
        >
          <Center w="100%" h="100%">
            <Icon as={BsImage} color="gray.300" />
          </Center>
        </Box>
      )}
      <MotionBox
        pos="absolute"
        inset={0}
        pointerEvents="none"
        bg="gray.100"
        rounded="md"
        animate={{ opacity: status === "loading" ? 1 : 0 }}
      />
    </>
  );
};

const Img = ({ src, imgStyle, children = defaultChildren, ...otherProps }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <Box display="inline-block" pos="relative" {...otherProps}>
      <Box pos="absolute" inset={0} pointerEvents="none">
        {children(status)}
      </Box>
      <motion.img
        src={src}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("errored")}
        style={{ opacity: status === "errored" ? 0 : 1, ...imgStyle }}
      />
    </Box>
  );
};

export default Img;
