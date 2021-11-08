import React, { useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  HStack,
  Center,
  Icon,
  AspectRatio,
  Tooltip,
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
import { palettes, selectPalettes } from "shared/utils/colors";
import { MotionImage } from "./animation";
import { MdLock } from "react-icons/md";
import NextLink from "next/link";
import Link from "./Link";
import { useAuth } from "client/useAuth";
import MediaForm from "./MediaForm";
import Img from "./Img";

const templateNames = data.templateNames;

const Templates = observer(({ portfolio }) => {
  const [editing, setEditing] = useState(null);
  const user = useAuth();

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
            {templateNames.map((templateName) => {
              const templateOptions = data.templates[templateName];
              const isSelected = templateName === portfolio.template;
              return (
                <FormSection
                  key={templateName}
                  onClick={(e) => {
                    portfolio.set({
                      template: templateName,
                    });
                  }}
                  cursor="pointer"
                  isSelected={isSelected}
                  canSelect={true}
                  canEdit
                  onEdit={() => setEditing(templateName)}
                  tooltips={{
                    edit: "Edit Template",
                  }}
                >
                  <Stack spacing={2}>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" fontWeight={600}>
                        {templateOptions.label}
                      </Text>
                    </Flex>
                    <AspectRatio pos="relative" w="100%" ratio={16 / 9}>
                      <Img
                        objectFit="cover"
                        src={templateOptions.img}
                        w="100%"
                        h="100%"
                        bg="gray.200"
                        rounded="md"
                      />
                    </AspectRatio>
                  </Stack>
                  {templateOptions.locked && !data.hasSubscription(user) && (
                    <>
                      <Tooltip
                        label="In order to publish with this template you'll first need
                                need to upgrade"
                      >
                        <HStack
                          pos="absolute"
                          align="center"
                          bottom={0}
                          right={0}
                          px={2}
                          py={1}
                          spacing={1}
                          bg="secondary.400"
                          color="whiteAlpha.900"
                          borderTopLeftRadius="4px"
                          borderBottomRightRadius="4px"
                        >
                          <Text mt="2px" fontSize="sm">
                            Premium
                          </Text>
                          <Icon fontSize="md" as={MdLock} />
                        </HStack>
                      </Tooltip>
                    </>
                  )}
                </FormSection>
              );
            })}
            <FormSection>
              <Center w="100%" h="64px">
                <Text fontSize="sm" fontWeight={600} color="gray.800">
                  More templates coming soon!
                </Text>
              </Center>
            </FormSection>
          </Stack>
        </Section>
      )}
    </Stack>
  );
});

const templateForms = {
  os: observer(({ template, settings }) => {
    return (
      <InputContainer
        label="Wallpaper"
        info="Accepted formats: png, jpg, heic, gif"
      >
        <MediaForm
          medias={settings.wallpaper}
          accept={["image/png", "image/jpeg", "image/heic", "image/gif"]}
          allowMultiple={false}
        />
      </InputContainer>
    );
  }),
};

const TemplateSettings = observer(({ template, settings, onBack }) => {
  const templateOptions = data.templates[template];
  // local template inout options
  const TemplateForm = templateForms[template];
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
                palettes={selectPalettes(templateOptions.palettes)}
                value={settings.palette || templateOptions.defaults.palette}
                onChange={(palette) => {
                  settings.set({ palette });
                }}
              />
            </InputContainer>
            {TemplateForm && (
              <TemplateForm template={template} settings={settings} />
            )}
          </Stack>
        </FormSection>
      </Section>
    </>
  );
});

export default Templates;
