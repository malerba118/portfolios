import React, { useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  HStack,
  Heading,
  Icon,
  Center,
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
                >
                  <Stack spacing={2}>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" fontWeight={600}>
                        {templateOptions.label}
                      </Text>
                    </Flex>
                    <Box pos="relative" w="100%" h="200px">
                      <MotionImage
                        objectFit="cover"
                        src={templateOptions.img}
                        w="100%"
                        h="100%"
                        bg="gray.200"
                        rounded="md"
                      />
                      {templateOptions.locked && !data.hasSubscription(user) && (
                        <>
                          <Center pos="absolute" inset={0} bg="whiteAlpha.800">
                            <Stack align="center">
                              <Icon
                                color="gray.700"
                                fontSize="xl"
                                as={MdLock}
                              />
                              <Text fontSize="sm" textAlign="center" px={4}>
                                In order to publish with this template you'll
                                need to{" "}
                                <span
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                >
                                  <NextLink href="/pricing">
                                    <Text
                                      display="inline"
                                      textDecoration="underline"
                                      _hover={{
                                        color: "gray.600",
                                      }}
                                    >
                                      upgrade your account
                                    </Text>
                                  </NextLink>
                                </span>
                                .
                              </Text>
                            </Stack>
                          </Center>
                        </>
                      )}
                    </Box>
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
                palettes={selectPalettes(templateOptions.palettes)}
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
