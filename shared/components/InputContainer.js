import React from "react";
import { Stack, Text, Flex, Tooltip, Icon } from "@chakra-ui/react";
import {
  IoMdEye as VisibleIcon,
  IoMdEyeOff as HiddenIcon,
} from "react-icons/io";
import IconButton from "shared/components/IconButton";

import { BiInfoCircle } from "react-icons/bi";

const InputContainer = ({
  label,
  children,
  isHidden,
  canHide,
  onHideChange,
  info,
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
            size="xs"
            onClick={() => onHideChange(false)}
            icon={<HiddenIcon />}
          />
        )}
        {canHide && !isHidden && (
          <IconButton
            tooltip="Hide Field"
            rounded="2px"
            size="xs"
            onClick={() => onHideChange(true)}
            icon={<VisibleIcon />}
          />
        )}
      </Flex>
      {children}
    </Stack>
  );
};

export default InputContainer;
