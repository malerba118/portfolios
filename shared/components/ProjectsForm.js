import React, { useState } from "react";
import { Stack, Input, Textarea, Heading } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import MediaForm from "./MediaForm";
import ReorderableList from "./ReorderableList";

const ProjectFormItem = observer(({ project, expanded, onDelete }) => (
  <FormSection
    canDelete
    onDelete={() => onDelete?.(project.id)}
    tooltips={{
      delete: "Delete Project",
    }}
    expanded={expanded}
  >
    {!expanded && <Heading fontSize="md">{project.name || "Untitled"}</Heading>}
    {expanded && (
      <Stack spacing={4}>
        <InputContainer label="Name">
          <Input
            value={project.name}
            onChange={(e) => {
              project.set({ name: e.target.value });
            }}
            placeholder="Project Name"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Summary">
          <Input
            value={project.summary}
            onChange={(e) => {
              project.set({ summary: e.target.value });
            }}
            placeholder="Summary"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Description">
          <Textarea
            value={project.description}
            onChange={(e) => {
              project.set({ description: e.target.value });
            }}
            placeholder="Description"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Photos">
          <MediaForm
            medias={project.images}
            accept={["image/png", "image/jpeg"]}
          />
        </InputContainer>
      </Stack>
    )}
  </FormSection>
));

const ProjectsForm = observer(({ projects, onDelete, onReorder, expanded }) => {
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
