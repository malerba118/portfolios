import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { MdRemove } from "react-icons/md";
import * as styles from "../utils/styles";

const FormSection = ({ children, canDelete, onDelete, tooltips }) => {
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
          <Tooltip label={tooltips?.delete}>
            <IconButton
              size="sm"
              variant="solid"
              borderRadius={0}
              icon={<MdRemove />}
              onClick={() => onDelete?.()}
            />
          </Tooltip>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default FormSection;
