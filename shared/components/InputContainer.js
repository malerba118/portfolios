import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const InputContainer = ({ label, children }) => {
  return (
    <Stack
      as={"form"}
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Text fontSize="sm" fontWeight={600}>
        {label}
      </Text>
      {children}
    </Stack>
  );
};

export default InputContainer;
