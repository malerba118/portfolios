import React, { useState } from "react";
import {
  Heading,
  Stack,
  Divider,
  Input,
  Text,
  Box,
  Button,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import * as styles from "../utils/styles";

const Section = ({ title, children }) => {
  return (
    <>
      <Box>
        <Stack>
          <Heading size="md">{title}</Heading>
          <Box>{children}</Box>
        </Stack>
      </Box>
      {/* <Box h="2px" bg="gray.200" /> */}
    </>
  );
};

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

const Editable = ({ children, canDelete, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <Box
      {...styles.borders({ top: true, right: true, bottom: true, left: true })}
      borderColor={editing ? "purple.300" : "gray.200"}
      borderStyle={editing ? "dashed" : "solid"}
      p={6}
      rounded="md"
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        display={hovered || editing ? "block" : "none"}
        position="absolute"
        top="0px"
        right="0px"
        borderBottomStartRadius={3}
        borderTopEndRadius={3}
        overflow="hidden"
      >
        {!editing && (
          <IconButton
            size="sm"
            variant="solid"
            // colorScheme="purple"
            // color="white"
            borderRadius={0}
            icon={<MdEdit />}
            onClick={() => setEditing(true)}
          />
        )}
        {editing && (
          <IconButton
            size="sm"
            variant="solid"
            // colorScheme="purple"
            // color="white"
            borderRadius={0}
            icon={<MdSave />}
            onClick={() => setEditing(false)}
          />
        )}
        {canDelete && (
          <IconButton
            size="sm"
            variant="solid"
            // colorScheme="purple"
            // color="white"
            borderRadius={0}
            icon={<MdDelete />}
            onClick={() => onDelete?.()}
          />
        )}
      </Box>
      {children}
    </Box>
  );
};

const PortfolioContentEditor = ({ width, height, portfolio }) => {
  return (
    <Stack p={6} spacing={6}>
      {/* <Section title="About">
        <Text mb="8px">First Name</Text>
        <Input value={"Austin"} placeholder="First Name" size="sm" />
        <Text mb="8px">Last Name</Text>
        <Input value={"Malerba"} placeholder="Last Name" size="sm" />
      </Section>
      <Section title="About">
        <Text mb="8px">First Name</Text>
        <Input value={"Austin"} placeholder="First Name" size="sm" />
        <Text mb="8px">Last Name</Text>
        <Input value={"Malerba"} placeholder="Last Name" size="sm" />
      </Section> */}
      <Section title="About">
        <Editable>
          <Stack spacing={4}>
            <InputContainer label="First Name">
              <Input value={"Austin"} placeholder="First Name" size="sm" />
            </InputContainer>
            <InputContainer label="Last Name">
              <Input value={"Malerba"} placeholder="First Name" size="sm" />
            </InputContainer>
            <InputContainer label="Title">
              <Input
                value={"Software Engineer"}
                placeholder="Occupation"
                size="sm"
              />
            </InputContainer>
          </Stack>
        </Editable>
      </Section>
      <Section title="Projects">
        <Editable canDelete>
          <Stack spacing={4}>
            <InputContainer label="Name">
              <Input
                value={"Iconik Studio"}
                placeholder="Project Name"
                size="sm"
              />
            </InputContainer>
            <InputContainer label="Summary">
              <Input value={"An svg editor"} placeholder="Summary" size="sm" />
            </InputContainer>
            <InputContainer label="Description">
              <Textarea value={""} placeholder="Description" size="sm" />
            </InputContainer>
          </Stack>
        </Editable>
      </Section>
      <Section title="Work">
        <Editable canDelete />
      </Section>
    </Stack>
  );
};

export default PortfolioContentEditor;
