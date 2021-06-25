import React, { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { MdDelete, MdRemove } from "react-icons/md";
import * as styles from "../utils/styles";

const FormSection = ({ children, canDelete, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      {...styles.borders({ top: true, right: true, bottom: true, left: true })}
      p={6}
      rounded="md"
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        display={hovered ? "block" : "none"}
        position="absolute"
        top="0px"
        right="0px"
        borderBottomStartRadius={3}
        borderTopEndRadius={3}
        overflow="hidden"
      >
        {canDelete && (
          <IconButton
            size="sm"
            variant="solid"
            // colorScheme="purple"
            // color="white"
            borderRadius={0}
            icon={<MdRemove />}
            onClick={() => onDelete?.()}
          />
        )}
      </Box>
      {children}
    </Box>
  );
};

export default FormSection;
