import React, { useState } from "react";
import {
  Heading,
  Stack,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const Section = ({ title, tooltips, children, canAdd = false, onAdd }) => {
  return (
    <>
      <Box>
        <Stack>
          <Flex justify="space-between" align="flex-end">
            <Heading size="md">{title}</Heading>
            {canAdd && (
              <Tooltip label={tooltips?.add}>
                <IconButton
                  size="sm"
                  rounded="4px"
                  icon={<MdAdd />}
                  onClick={() => onAdd?.()}
                />
              </Tooltip>
            )}
          </Flex>
          <Box>{children}</Box>
        </Stack>
      </Box>
      {/* <Box h="2px" bg="gray.200" /> */}
    </>
  );
};

export default Section;
