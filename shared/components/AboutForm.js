import React, { useState } from "react";
import { Stack, Input, HStack, Box } from "@chakra-ui/react";
import { useAuth } from "client/useAuth";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import Textarea from "./Textarea";
import MediaForm from "./MediaForm";
import FileUploader from "./FileUploader";
import ResumeUploader from "./ResumeUploader";

const AboutForm = observer(({ about }) => {
  const user = useAuth();

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
        <InputContainer w="100%" label="Title">
          <Input
            value={about.title}
            onChange={(e) => {
              about.set({ title: e.target.value });
            }}
            placeholder="Your occupation"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Summary">
          <Input
            value={about.summary}
            onChange={(e) => {
              about.set({ summary: e.target.value });
            }}
            placeholder="Tell us about you in a sentence"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="About">
          <Textarea
            value={about.description}
            onChange={(value) => {
              about.set({ description: value });
            }}
            placeholder="Tell us all about you"
            size="sm"
          />
        </InputContainer>
        <InputContainer w="100%" label="Resume">
          <ResumeUploader
            folder={`users/${user?.id}/public/`}
            height={"32px"}
            width="auto"
            rounded="sm"
            resume={about.resume}
            onChange={(resume) => {
              about.set({ resume });
            }}
          />
        </InputContainer>
        <InputContainer label="Logo">
          <MediaForm
            medias={about.logo}
            accept={["image/png", "image/jpeg", "image/heic", "image/gif"]}
            allowMultiple={false}
          />
        </InputContainer>
        <InputContainer label="Photos">
          <MediaForm
            medias={about.images}
            accept={["image/png", "image/jpeg", "image/heic", "image/gif"]}
          />
        </InputContainer>
      </Stack>
    </FormSection>
  );
});

export default AboutForm;
