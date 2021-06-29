import React, { useState } from "react";
import { Stack, Input, Textarea } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import MediaForm from "./MediaForm";

const ProjectsForm = observer(({ projects, onDelete }) => {
  return (
    <Stack spacing={6}>
      {projects.map((project) => (
        <FormSection
          key={project.id}
          canDelete
          onDelete={() => onDelete?.(project.id)}
          tooltips={{
            delete: "Remove Project",
          }}
        >
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
        </FormSection>
      ))}
    </Stack>
  );
});

export default ProjectsForm;
