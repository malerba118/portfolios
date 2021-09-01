import React, { useState } from "react";
import { Stack, Input, HStack } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";

const ContactForm = observer(({ contact }) => {
  return (
    <FormSection>
      <Stack spacing={4}>
        <InputContainer
          label="Email"
          canHide
          isHidden={contact.email.hidden}
          onHideChange={(hidden) => {
            contact.email.set({
              hidden,
            });
          }}
        >
          <Input
            type="email"
            name="email"
            value={contact.email.value}
            onChange={(e) => {
              contact.email.set({ value: e.target.value });
            }}
            placeholder="Email"
            size="sm"
          />
        </InputContainer>
        <InputContainer
          label="Phone"
          canHide
          isHidden={contact.phone.hidden}
          onHideChange={(hidden) => {
            contact.phone.set({
              hidden,
            });
          }}
        >
          <Input
            type="tel"
            value={contact.phone.value}
            onChange={(e) => {
              contact.phone.set({ value: e.target.value });
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
