import React, { useState } from "react";
import { Box, IconButton, Tooltip, Icon } from "@chakra-ui/react";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import * as styles from "../utils/styles";
import _styles from "./FormSection.module.css";
import { MotionBox, transitions } from "./animation";

const FormSection = ({
  children,
  canDelete,
  onDelete,
  tooltips,
  expanded = true,
  ...otherProps
}) => {
  return (
    <MotionBox
      {...styles.borders({ top: true, right: true, bottom: true, left: true })}
      p={6}
      rounded="md"
      position="relative"
      className={_styles.showOnHoverTrigger}
      initial={{ height: "auto" }}
      overflow="hidden"
      animate={{
        height: expanded ? "auto" : "68px",
        transition: transitions.two(0.25),
      }}
      {...otherProps}
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
              fontSize="md"
              variant="solid"
              borderRadius={0}
              icon={<Icon as={RemoveIcon} color="orange.500" />}
              onClick={() => onDelete?.()}
            />
          </Tooltip>
        )}
      </Box>
      {children}
    </MotionBox>
  );
};

export default FormSection;
