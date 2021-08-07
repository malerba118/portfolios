import { Box, Stack, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { observer } from "mobx-react";
import Section from "./Section";
import FormSection from "./FormSection";
import Select, { Option } from "./Select";

const templates = [
  {
    name: "venice",
    label: "Venice",
    versions: [
      {
        label: "Version 1",
        value: "v1",
      },
    ],
  },
  {
    name: "madrid",
    label: "Madrid",
    versions: [
      {
        label: "Version 1",
        value: "v1",
      },
    ],
  },
];

const Templates = observer(({ portfolio }) => {
  return (
    <Stack p={6} spacing={6}>
      <Section title="Templates">
        <Stack spacing={6}>
          {templates.map((template) => {
            const isSelected = template.name === portfolio.template.name;
            const version = isSelected
              ? portfolio.template.version
              : template.versions.slice().pop().value;
            return (
              <FormSection
                key={template.name}
                borderColor={isSelected ? "purple.300" : undefined}
                // borderStyle={isSelected ? "dashed" : undefined}
                onClick={(e) => {
                  portfolio.set({
                    template: {
                      name: template.name,
                      version,
                    },
                  });
                }}
                cursor="pointer"
                bg={isSelected ? "purple.50" : "white"}
              >
                <Stack spacing={2}>
                  <Flex justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight={600}>
                      {template.label}
                    </Text>
                    <Select
                      onChange={(version) => {
                        portfolio.set({
                          template: {
                            name: template.name,
                            version,
                          },
                        });
                      }}
                      value={version}
                      size="sm"
                    >
                      {template.versions.map((version) => (
                        <Option
                          key={version.value}
                          value={version.value}
                          label={version.label}
                        />
                      ))}
                    </Select>
                  </Flex>
                  <Image
                    objectFit="cover"
                    src={`/templates/${template.name}.png`}
                    w="100%"
                    h="200px"
                    bg="gray.200"
                    rounded="md"
                  />
                </Stack>
              </FormSection>
            );
          })}
        </Stack>
      </Section>
    </Stack>
  );
});

export default Templates;
