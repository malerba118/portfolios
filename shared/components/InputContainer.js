import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const InputContainer = ({ label, children }) => {
  return (
    <Stack>
      <Text fontSize="sm" fontWeight={600}>
        {label}
      </Text>
      {children}
    </Stack>
  );
};

export default InputContainer;
