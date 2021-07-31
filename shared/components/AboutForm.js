import React, { useState } from "react";
import { Stack, Input, HStack } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import Textarea from "./Textarea";
import MediaForm from "./MediaForm";

const AboutForm = observer(({ about }) => {
  return (
    <FormSection>
      <Stack spacing={4}>
        <HStack spacing={4}>
          <InputContainer label="First Name">
            <Input
              type="text"
              name="first-name"
              value={about.firstName}
              onChange={(e) => {
                about.set({ firstName: e.target.value });
              }}
              placeholder="First Name"
              size="sm"
            />
          </InputContainer>
          <InputContainer label="Last Name">
            <Input
              value={about.lastName}
              onChange={(e) => {
                about.set({ lastName: e.target.value });
              }}
              placeholder="Last Name"
              size="sm"
            />
          </InputContainer>
        </HStack>
        <InputContainer label="Title">
          <Input
            value={about.title}
            onChange={(e) => {
              about.set({ title: e.target.value });
            }}
            placeholder="Occupation"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Summary">
          <Input
            value={about.summary}
            onChange={(e) => {
              about.set({ summary: e.target.value });
            }}
            placeholder="Summary"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="About">
          <Textarea
            value={about.description}
            onChange={(value) => {
              about.set({ description: value });
            }}
            placeholder="About"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Photos">
          <MediaForm
            medias={about.images}
            accept={["image/png", "image/jpeg"]}
          />
        </InputContainer>
      </Stack>
    </FormSection>
  );
});

export default AboutForm;
