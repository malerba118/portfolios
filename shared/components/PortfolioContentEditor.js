import React, { useState } from "react";
import {
  Heading,
  Stack,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import FormSection from "./FormSection";
import AboutForm from "./AboutForm";
import ProjectsForm from "./ProjectsForm";
import * as styles from "../utils/styles";
import Section from "./Section";
import { observer } from "mobx-react";

const PortfolioContentEditor = observer(({ width, height, portfolio }) => {
  return (
    <Stack p={6} spacing={6}>
      <Section title="About">
        <AboutForm about={portfolio.content.about} />
      </Section>
      <Section
        title="Projects"
        canAdd
        onAdd={() => portfolio.content.addProject()}
        tooltips={{
          add: "Add Project",
        }}
      >
        {({ expanded }) => (
          <ProjectsForm
            projects={portfolio.content.projects}
            expanded={expanded}
            onDelete={(id) => portfolio.content.removeProject(id)}
            onReorder={(projects) => portfolio.content.set({ projects })}
          />
        )}
      </Section>
      {/* <Section title="Work">
        <FormSection canDelete />
      </Section> */}
    </Stack>
  );
});

export default PortfolioContentEditor;
