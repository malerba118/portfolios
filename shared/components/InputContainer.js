import React from "react";
import { Stack, Text, Flex } from "@chakra-ui/react";
import {
  IoMdEye as VisibleIcon,
  IoMdEyeOff as HiddenIcon,
} from "react-icons/io";
import IconButton from "shared/components/IconButton";

const InputContainer = ({
  label,
  children,
  isHidden,
  canHide,
  onHideChange,
  ...otherProps
}) => {
  return (
    <Stack
      {...otherProps}
      as={"form"}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Flex justify="space-between" align="flex-end">
        <Text as={isHidden ? "s" : "p"} fontSize="sm" fontWeight={600}>
          {label}
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
