import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputRightElement,
  InputGroup,
  Input,
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
import * as styles from "shared/utils/styles";

const TemplateThumbnail = ({ templateName, template, isSelected, onClick }) => {
  return (
    <Image
      key={templateName}
      tabIndex={0}
      cursor="pointer"
      src={template.img}
      rounded="md"
      h="100%"
      onClick={onClick}
      {...styles.borders({
        top: true,
        right: true,
        bottom: true,
        left: true,
        canSelect: true,
        isSelected,
      })}
    />
  );
};

const TemplateModal = ({ isOpen, onContinue, onClose }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [selectedTemplate, setSelectedTemplate] = useState(templateNames[0]);

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Choose a Template</ModalHeader>
        <ModalBody p={0}>
          <Stack spacing={0}>
            <Box display="inline-block" pos="relative">
              <Spinner
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="purple.300"
              />
              <AspectRatio w="100%" ratio={20 / 9}>
                <Embed
                  src={`${getHostingUrl({ template: selectedTemplate })}`}
                  height="100%"
                  width="100%"
                  scale={0.7}
                  bg="transparent"
                />
              </AspectRatio>
            </Box>
            <HStack h="100px" p={2}>
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
          <Button onClick={onClose} mr={3}>
            Skip
          </Button>
          <Button
            colorScheme="purple"
            onClick={() => onContinue?.(selectedTemplate)}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TemplateModal;
