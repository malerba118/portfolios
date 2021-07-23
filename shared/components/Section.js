import React, { useState } from "react";
import {
  Heading,
  Stack,
  Flex,
  Box,
  IconButton,
  Tooltip,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  MdAdd,
  MdExpandMore as ExpandIcon,
  MdExpandLess as CollapseIcon,
} from "react-icons/md";

const Section = ({ title, tooltips, children, canAdd = false, onAdd }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <Box>
        <Stack>
          <Flex justify="space-between" align="flex-end">
            <Heading size="md">
              {canAdd && (
                <Button
                  align="center"
                  fontSize="inherit"
                  onClick={() => setExpanded(!expanded)}
                  variant="unstyled"
                  height="auto"
                >
                  {title}{" "}
                  <Icon
                    fontSize="md"
                    as={expanded ? CollapseIcon : ExpandIcon}
                  />
                </Button>
              )}
              {!canAdd && title}
            </Heading>
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
          <Box>
            {typeof children === "function" ? children({ expanded }) : children}
          </Box>
        </Stack>
      </Box>
      {/* <Box h="2px" bg="gray.200" /> */}
    </>
  );
};

export default Section;
