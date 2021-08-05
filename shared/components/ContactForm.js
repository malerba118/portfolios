import React, { useState } from "react";
import { Stack, Input, HStack } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";

const ContactForm = observer(({ contact }) => {
  return (
    <FormSection>
      <Stack spacing={4}>
        <InputContainer label="Email">
          <Input
            type="email"
            name="email"
            value={contact.email}
            onChange={(e) => {
              contact.set({ email: e.target.value });
            }}
            placeholder="Email"
            size="sm"
          />
        </InputContainer>
        <InputContainer label="Phone">
          <Input
            type="tel"
            value={contact.phone}
            onChange={(e) => {
              contact.set({ phone: e.target.value });
            }}
            placeholder="Phone"
            size="sm"
          />
        </InputContainer>
      </Stack>
    </FormSection>
  );
});

export default ContactForm;
