import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Button,
  Icon,
  Box,
  Wrap,
  Stack,
  AspectRatio,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import Embed from "./Embed";
import { getHostingUrl } from "shared/utils/url";
import { templates, templateNames } from "shared/utils/data";
import storage from "local-storage";
import * as styles from "shared/utils/styles";
import TemplateThumbnail from "./TemplateThumbnail";

const TEMPLATE_PERSONAS = {
  gallery: "wedding",
  skrol: "fitness",
  reveal: "wedding",
  circles: "architect",
  os: "computerEngineer",
  madrid: "architect",
};

const TemplateModal = ({ onContinue, onClose }) => {
  const [isHidden, setHidden] = useState(storage.get("hide-templates-modal"));
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [selectedTemplate, setSelectedTemplate] = useState(templateNames[0]);

  useEffect(() => {
    storage.set("hide-templates-modal", isHidden);
  }, [isHidden]);

  const src = `${getHostingUrl({
    template: selectedTemplate,
    persona: TEMPLATE_PERSONAS[selectedTemplate],
  })}`;

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={!isHidden}
      onClose={() => setHidden(true)}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Choose a Template</ModalHeader>
        <ModalBody p={0}>
          <Stack spacing={0}>
            <Box display="inline-block" pos="relative">
              <Center pos="absolute" inset={0}>
                <Spinner color="secondary.300" />
              </Center>
              <AspectRatio w="100%" ratio={20 / 9}>
                <Embed
                  key={src}
                  src={src}
                  height="100%"
                  width="100%"
                  scale={0.7}
                  bg="transparent"
                />
              </AspectRatio>
            </Box>
            <HStack h="100px" p={2} overflowX="auto">
              {templateNames.map((templateName) => {
                const template = templates[templateName];
                return (
                  <TemplateThumbnail
                    key={templateName}
                    templateName={templateName}
                    template={template}
                    isSelected={selectedTemplate === templateName}
                    onClick={() => setSelectedTemplate(templateName)}
                  />
                );
              })}
            </HStack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setHidden(true);
            }}
            mr={3}
          >
            Skip
          </Button>
          <Button
            colorScheme="secondary"
            onClick={() => {
              setHidden(true);
              onContinue?.(selectedTemplate);
            }}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TemplateModal;
