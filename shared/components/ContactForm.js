import React, { useState } from "react";
import { Stack, Input, HStack } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import SocialLinksForm from "./SocialLinksForm";
import { nanoid } from "nanoid";

const ContactForm = observer(({ contact }) => {
  return (
    <FormSection>
      <Stack spacing={4}>
        <InputContainer
          label="Email"
          info="Contact form submissions will be sent to this email. If it's not provided, submissions will be sent to your account email."
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
        <InputContainer
          label="Social Links"
          canAdd
          onAdd={() => {
            contact.socialLinks.add({
              id: nanoid(),
              platform: null,
              url: null,
            });
          }}
          tooltips={{
            add: "Add Link",
          }}
        >
          <SocialLinksForm socialLinks={contact.socialLinks} />
        </InputContainer>
      </Stack>
    </FormSection>
  );
});

export default ContactForm;
