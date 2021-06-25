import React, { useState } from "react";
import { Heading, Stack, Flex, Box, IconButton } from "@chakra-ui/react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import FormSection from "./FormSection";
import AboutForm from "./AboutForm";
import ProjectsForm from "./ProjectsForm";
import * as styles from "../utils/styles";

const Section = ({ title, children, canAdd = false, onAdd }) => {
  return (
    <>
      <Box>
        <Stack>
          <Flex justify="space-between" align="flex-end">
            <Heading size="md">{title}</Heading>
            {canAdd && (
              <IconButton
                size="sm"
                rounded="4px"
                icon={<MdAdd />}
                onClick={() => onAdd?.()}
              />
            )}
          </Flex>
          <Box>{children}</Box>
        </Stack>
      </Box>
      {/* <Box h="2px" bg="gray.200" /> */}
    </>
  );
};

const PortfolioContentEditor = ({ width, height, portfolio }) => {
  return (
    <Stack p={6} spacing={6}>
      <Section title="About">
        <AboutForm about={portfolio.content.about} />
      </Section>
      <Section
        title="Projects"
        canAdd
        onAdd={() => portfolio.content.addProject()}
      >
        <ProjectsForm
          portfolio={portfolio}
          projects={portfolio.content.projects}
        />
        {/* <FormSection canDelete>
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
        </FormSection> */}
      </Section>
      <Section title="Work">
        <FormSection canDelete />
      </Section>
    </Stack>
  );
};

export default PortfolioContentEditor;
