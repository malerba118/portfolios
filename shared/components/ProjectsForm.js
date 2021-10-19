import React, { useState } from "react";
import { Stack, Input, Heading, HStack, Box, Text } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import MediaForm from "./MediaForm";
import ReorderableList from "./ReorderableList";
import Datepicker from "./Datepicker";
import Textarea from "./Textarea";

const ProjectFormItem = observer(({ project, expanded, onDelete }) => (
  <FormSection
    canDelete
    onDelete={() => onDelete?.(project.id)}
    tooltips={{
      delete: "Delete Work Item",
    }}
    expanded={expanded}
  >
    {!expanded && (
      <Heading pos="absolute" fontSize="md">
        {project.name || "Untitled"}
      </Heading>
    )}
    <Stack visibility={expanded ? "visible" : "hidden"} spacing={4}>
      <InputContainer label="Name">
        <Input
          type="text"
          name="project-name"
          value={project.name}
          onChange={(e) => {
            project.set({ name: e.target.value });
          }}
          placeholder="Name of project, job, service, etc."
          size="sm"
        />
      </InputContainer>
      <InputContainer label="Summary">
        <Input
          name="project-summary"
          autoComplete="off"
          value={project.summary}
          onChange={(e) => {
            project.set({ summary: e.target.value });
          }}
          placeholder="Tell us about this work in a sentence"
          size="sm"
        />
      </InputContainer>
      <HStack spacing={4}>
        <InputContainer label="Start Date">
          <Box>
            <Datepicker
              value={project.startDate}
              onChange={(date) => {
                project.set({ startDate: date });
              }}
            />
          </Box>
        </InputContainer>
        <InputContainer label="End Date">
          <Box>
            <Datepicker
              value={project.endDate}
              onChange={(date) => {
                project.set({ endDate: date });
              }}
            />
          </Box>
        </InputContainer>
      </HStack>
      <InputContainer label="Description">
        <Textarea
          value={project.description}
          onChange={(value) => {
            project.set({ description: value });
          }}
          placeholder="Tell us all about this work"
          size="sm"
        />
      </InputContainer>
      <InputContainer label="Photos">
        <MediaForm
          medias={project.images}
          accept={["image/png", "image/jpeg", "image/gif", "image/heic"]}
        />
      </InputContainer>
    </Stack>
  </FormSection>
));

const ProjectsForm = observer(({ projects, onDelete, onReorder, expanded }) => {
  if (projects.length === 0) {
    return (
      <Text my={2} fontSize="sm" color="gray.600">
        No projects yet, try adding one.
      </Text>
    );
  }
  return (
    <Stack mb={-6}>
      <ReorderableList
        items={projects.slice()}
        onChange={onReorder}
        direction="vertical"
        getListStyle={(isDraggingOver) => ({
          display: "flex",
          flexDirection: "column",
        })}
        getItemStyle={(isDragging, index) => ({
          marginBottom: index !== projects.length ? "var(--chakra-space-6)" : 0,
        })}
        isDisabled={expanded}
      >
        {(project) => (
          <ProjectFormItem
            key={project.id}
            project={project}
            expanded={expanded}
            onDelete={onDelete}
          />
        )}
      </ReorderableList>
    </Stack>
  );
});

export default ProjectsForm;
