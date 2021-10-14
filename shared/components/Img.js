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
        animate={{
          opacity: status === "loading" ? 1 : 0,
          transition: { duration: 0.33 },
        }}
      />
    </>
  );
};

const Img = ({
  src,
  objectFit,
  imgStyle,
  children = defaultChildren,
  ...otherProps
}) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <Box
      display="inline-block"
      pos="relative"
      overflow="hidden"
      {...otherProps}
    >
      <Box pos="absolute" inset={0} pointerEvents="none">
        {children(status)}
      </Box>
      <motion.img
        src={src}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("errored")}
        style={{
          opacity: status === "errored" ? 0 : 1,
          height: "100%",
          width: "100%",
          objectFit,
          ...imgStyle,
        }}
      />
    </Box>
  );
};

export default Img;
