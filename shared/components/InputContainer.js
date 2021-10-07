import React from "react";
import { Stack, Text, Flex, Tooltip, Icon } from "@chakra-ui/react";
import {
  IoMdEye as VisibleIcon,
  IoMdEyeOff as HiddenIcon,
} from "react-icons/io";
import IconButton from "shared/components/IconButton";

import { BiInfoCircle } from "react-icons/bi";
import { MdAdd } from "react-icons/md";

const DEFAULT_TOOLTIPS = {
  add: "Add",
};

const InputContainer = ({
  label,
  children,
  isHidden,
  canHide,
  onHideChange,
  canAdd,
  onAdd,
  info,
  tooltips = DEFAULT_TOOLTIPS,
  iconSize = "xs",
  ...otherProps
}) => {
  return (
    <Stack
      as={"form"}
      {...otherProps}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Flex justify="space-between" align="flex-end">
        <Text as={isHidden ? "s" : "p"} fontSize="sm" fontWeight={600}>
          {label}
          {info && (
            <Tooltip textTransform="none" label={info}>
              <span>
                <Icon fontSize="md" mx={1} mb="4px" as={BiInfoCircle} />
              </span>
            </Tooltip>
          )}
        </Text>
        {canHide && isHidden && (
          <IconButton
            tooltip="Show Field"
            rounded="2px"
            size={iconSize}
            onClick={() => onHideChange(false)}
            icon={<HiddenIcon />}
          />
        )}
        {canHide && !isHidden && (
          <IconButton
            tooltip="Hide Field"
            rounded="2px"
            size={iconSize}
            onClick={() => onHideChange(true)}
            icon={<VisibleIcon />}
          />
        )}
        {canAdd && (
          <IconButton
            tooltip={tooltips?.add}
            size={iconSize}
            rounded="4px"
            icon={<MdAdd />}
            onClick={() => onAdd?.()}
          />
        )}
      </Flex>
      {children}
    </Stack>
  );
};

export default InputContainer;
