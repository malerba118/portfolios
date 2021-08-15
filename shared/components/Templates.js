import { Box, Stack, Flex, Text, Image, HStack } from "@chakra-ui/react";
import React from "react";
import { observer } from "mobx-react";
import Section from "./Section";
import FormSection from "./FormSection";
import Select, { Option } from "./Select";
import InputContainer from "./InputContainer";
import FontSelector from "./FontSelector";

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
      <Section title="Theme">
        <FormSection>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <InputContainer
                label="Heading Font"
                w="calc(50% - var(--chakra-sizes-2))"
              >
                <FontSelector />
              </InputContainer>
              <InputContainer
                label="Paragraph Font"
                w="calc(50% - var(--chakra-sizes-2))"
              >
                <FontSelector />
              </InputContainer>
            </HStack>
            <InputContainer label="Foo">
              <FontSelector />
            </InputContainer>
            <InputContainer label="Bar">
              <FontSelector />
            </InputContainer>
            <InputContainer label="Baz">
              <FontSelector />
            </InputContainer>
          </Stack>
        </FormSection>
      </Section>
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
                      fontSize="xs"
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
