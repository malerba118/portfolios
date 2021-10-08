import React, { useState } from "react";
import { Stack, Input, HStack, Box, Text } from "@chakra-ui/react";
import FormSection from "./FormSection";
import { observer } from "mobx-react";
import InputContainer from "./InputContainer";
import ReorderableList from "./ReorderableList";
import Select, { Option } from "./Select";

const PLATFORM_OPTIONS = [
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "pinterest",
    label: "Pinterest",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "github",
    label: "Github",
  },
];

const SocialLinksForm = observer(({ socialLinks }) => {
  if (socialLinks.items.length === 0) {
    return (
      <Text fontSize="sm" color="gray.600">
        No social links yet, try adding one.
      </Text>
    );
  }
  return (
    <ReorderableList
      items={socialLinks.items.slice()}
      onChange={(items) => {
        socialLinks.set({ items });
      }}
      direction="vertical"
      getListStyle={(isDraggingOver) => ({
        display: "flex",
        flexDirection: "column",
        marginBottom: "calc(-1 * var(--chakra-space-4))",
      })}
      getItemStyle={(isDragging, index) => ({
        marginBottom: "var(--chakra-space-4)",
      })}
    >
      {(socialLink) => (
        <SocialLinkItem
          key={socialLink.id}
          socialLink={socialLink}
          onDelete={() => socialLinks.remove(socialLink.id)}
        />
      )}
    </ReorderableList>
  );
});

const SocialLinkItem = observer(({ socialLink, onDelete }) => {
  return (
    <FormSection
      canDelete
      onDelete={onDelete}
      tooltips={{
        delete: "Delete Link",
      }}
      p={4}
      iconSize="xs"
      overflow="visible"
    >
      <HStack spacing={4}>
        <Box pos="relative" flex={1} zIndex={0}>
          <Select
            label={(label) => label || "Platform"}
            value={socialLink.platform}
            onChange={(value) => socialLink.set({ platform: value })}
            width="110px"
            listProps={{
              width: 28,
            }}
            placement="top"
          >
            {PLATFORM_OPTIONS.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Select>
        </Box>
        <Input
          value={socialLink.url}
          onChange={(e) => {
            socialLink.set({ url: e.target.value });
          }}
          flex={2}
          placeholder="url..."
          size="sm"
          _focus={{
            zIndex: 0,
          }}
        />
      </HStack>
    </FormSection>
  );
});

export default SocialLinksForm;
