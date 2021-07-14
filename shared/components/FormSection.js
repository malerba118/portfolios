import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { MdRemove } from "react-icons/md";
import * as styles from "../utils/styles";
import _styles from "./FormSection.module.css";

const FormSection = ({ children, canDelete, onDelete, tooltips }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      {...styles.borders({ top: true, right: true, bottom: true, left: true })}
      p={6}
      rounded="md"
      position="relative"
      className={_styles.showOnHoverTrigger}
    >
      <Box
        className={_styles.showOnHover}
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
