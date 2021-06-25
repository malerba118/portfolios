import React, { useState } from "react";
import { Stack, Input } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";

const AboutForm = observer(({ about }) => {
  return (
    <FormSection>
      <Stack spacing={4}>
        <InputContainer label="First Name">
          <Input
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
      </Stack>
    </FormSection>
  );
});

export default AboutForm;
