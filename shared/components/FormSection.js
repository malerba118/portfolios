import React, { useState } from "react";
import { Box, IconButton, Tooltip, Icon } from "@chakra-ui/react";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import { MdEdit as EditIcon } from "react-icons/md";
import * as styles from "../utils/styles";
import _styles from "./FormSection.module.css";
import { MotionBox, transitions } from "./animation";

const FormSection = ({
  children,
  canDelete,
  onDelete,
  canEdit,
  onEdit,
  tooltips,
  expanded = true,
  isSelected,
  canSelect,
  ...otherProps
}) => {
  return (
    <MotionBox
      {...styles.borders({
        top: true,
        right: true,
        bottom: true,
        left: true,
        isSelected,
        canSelect,
      })}
      p={6}
      rounded="md"
      position="relative"
      className={_styles.showOnHoverTrigger}
      initial={{ height: expanded ? "auto" : "68px" }}
      overflow="hidden"
      bg={isSelected ? "purple.50" : "white"}
      animate={{
        height: expanded ? "auto" : "68px",
        transition: transitions.two(0.3),
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
        zIndex={1}
      >
        {canEdit && (
          <Tooltip label={tooltips?.edit}>
            <IconButton
              size="sm"
              fontSize="sm"
              variant="solid"
              borderRadius={0}
              icon={<Icon as={EditIcon} />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            />
          </Tooltip>
        )}
        {canDelete && (
          <Tooltip label={tooltips?.delete}>
            <IconButton
              size="sm"
              fontSize="sm"
              variant="solid"
              borderRadius={0}
              icon={<Icon as={RemoveIcon} color="orange.500" />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            />
          </Tooltip>
        )}
      </Box>
      {children}
    </MotionBox>
  );
};

export default FormSection;
