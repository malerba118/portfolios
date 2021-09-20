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
        style: "3px solid",
      })}
    />
  );
};

export default TemplateThumbnail;
