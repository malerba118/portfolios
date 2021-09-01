import React, { useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import Section from "./Section";
import FormSection from "./FormSection";
import Select, { Option } from "./Select";
import InputContainer from "./InputContainer";
import FontSelector from "./FontSelector";
import PaletteSelector from "./PaletteSelector";
import IconButton from "./IconButton";
import { MdKeyboardBackspace } from "react-icons/md";
import * as data from "shared/utils/data";

const templates = [
  {
    name: "venice",
    label: "Venice",
    defaults: {
      headingFont: "Ubuntu",
      paragraphFont: "Ubuntu",
      palette: "ocean",
    },
  },
  {
    name: "madrid",
    label: "Madrid",
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "desert",
    },
  },
];

const Templates = observer(({ portfolio }) => {
  const [editing, setEditing] = useState(null);

  return (
    <Stack p={6} spacing={6}>
      {editing && (
        <TemplateSettings
          onBack={() => setEditing(null)}
          template={editing}
          settings={portfolio.templateSettingsMap[editing]}
        />
      )}
      {!editing && (
        <Section title="Templates">
          <Stack spacing={6}>
            {templates.map((template) => {
              const isSelected = template.name === portfolio.template;
              return (
                <FormSection
                  key={template.name}
                  onClick={(e) => {
                    portfolio.set({
                      template: template.name,
                    });
                  }}
                  cursor="pointer"
                  isSelected={isSelected}
                  canSelect={true}
                  canEdit
                  onEdit={() => setEditing(template.name)}
                >
                  <Stack spacing={2}>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" fontWeight={600}>
                        {template.label}
                      </Text>
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
      )}
    </Stack>
  );
});

const TemplateCard = ({ template }) => {
  return (
    <Box
      className={_styles.showOnHover}
      position="absolute"
      top="0px"
      right="0px"
      borderBottomStartRadius={3}
      borderTopEndRadius={3}
      overflow="hidden"
    >
      {canDelete && (
        <Tooltip label={tooltips?.delete}>
          <IconButton
            size="sm"
            fontSize="sm"
            variant="solid"
            borderRadius={0}
            icon={<Icon as={RemoveIcon} color="orange.500" />}
            onClick={() => onDelete?.()}
          />
        </Tooltip>
      )}
    </Box>
  );
};

const TemplateSettings = observer(({ template, settings, onBack }) => {
  const templateOptions = data.templates[template];
  return (
    <>
      <Section
        title={
          <Flex display="flex" align="center">
            <IconButton
              size="xs"
              tooltip="Back to Templates"
              rounded="sm"
              onClick={() => onBack?.()}
              icon={<MdKeyboardBackspace />}
              mr={2}
            />
            <Text>{templateOptions.label} Settings</Text>
          </Flex>
        }
      >
        <FormSection>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <InputContainer
                label="Heading Font"
                w="calc(50% - var(--chakra-sizes-2))"
              >
                <FontSelector
                  value={
                    settings.headingFont || templateOptions.defaults.headingFont
                  }
                  onChange={(font) => {
                    settings.set({ headingFont: font });
                  }}
                />
              </InputContainer>
              <InputContainer
                label="Paragraph Font"
                w="calc(50% - var(--chakra-sizes-2))"
              >
                <FontSelector
                  value={
                    settings.paragraphFont ||
                    templateOptions.defaults.paragraphFont
                  }
                  onChange={(font) => {
                    settings.set({ paragraphFont: font });
                  }}
                />
              </InputContainer>
            </HStack>
            <InputContainer label="Palette">
              <PaletteSelector
                value={settings.palette || templateOptions.defaults.palette}
                onChange={(palette) => {
                  settings.set({ palette });
                }}
              />
            </InputContainer>
          </Stack>
        </FormSection>
      </Section>
    </>
  );
});

export default Templates;
