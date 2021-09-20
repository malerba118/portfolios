import NextLink from "next/link";
import {
  Box,
  Stack,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Progress,
  AspectRatio,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Toolbar, MockBrowser } from "./unauthed";
import { useElementScroll, useTransform, useSpring } from "framer-motion";
import { MotionBox } from "./animation";
import Preload from "preload-it";
import { textures } from "shared/utils/styles";
import { MouseProvider } from "./animation/MouseProvider";
import MouseGravity from "./animation/MouseGravity";
import { getHostingUrl } from "shared/utils/url";
import TemplateThumbnail from "./TemplateThumbnail";
import { templates, templateNames } from "shared/utils/data";
import Embed from "./Embed";

const blobs = [
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="var(--chakra-colors-primary-300)"
      d="M36.7,-65.8C48.1,-57,58.3,-48.3,68.5,-37.3C78.7,-26.4,89,-13.2,90.7,1C92.4,15.1,85.5,30.3,75.4,41.5C65.4,52.8,52.2,60.1,39.1,67.5C26,74.8,13,82.2,1.2,80.1C-10.6,78,-21.2,66.5,-35.2,59.7C-49.2,52.9,-66.5,50.6,-75.6,41.5C-84.7,32.3,-85.5,16.1,-82.7,1.6C-79.9,-12.9,-73.3,-25.7,-64.4,-35.1C-55.4,-44.5,-44,-50.5,-32.8,-59.3C-21.7,-68.2,-10.9,-80.1,0.9,-81.6C12.7,-83.2,25.3,-74.5,36.7,-65.8Z"
      transform="translate(100 100)"
    />
  </svg>,
];

const preload = Preload();

const Video = ({ src, isActive, autoPlay }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isActive && autoPlay) {
        ref.current.play();
      } else {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    }
  }, [isActive, autoPlay]);

  return (
    <video
      src={src}
      style={{ display: isActive ? "block" : "none" }}
      ref={(el) => {
        if (el) {
          el.playbackRate = 1.5;
        }
        ref.current = el;
      }}
      muted
      loop
    />
  );
};

const Landing = ({}) => {
  return (
    <MouseProvider>
      <Box>
        <Flex h="100vh" direction="column" pos="relative" overflow="hidden">
          <Box pos="absolute" left="-300px" top="-300px" w="700px" zIndex={-1}>
            <MouseGravity opacity={0.5} amount={20}>
              {blobs[0]}
            </MouseGravity>
          </Box>
          <Box
            pos="absolute"
            bottom="-200px"
            right="-150px"
            w="500px"
            zIndex={-1}
          >
            <MouseGravity opacity={0.5} amount={10}>
              {blobs[0]}
            </MouseGravity>
          </Box>
          <Toolbar />
          <Box
            flex={1}
            px={24}
            py={24}
            color="secondary.500"
            maxW={{ base: "100%", md: "80%" }}
          >
            <Heading size="4xl">Build a Portfolio Site in Seconds</Heading>
            <Heading w="75%" my={2} size="md">
              You shouldn't have to spend your time learning how to build a
              website. That's why Vernos will just do it for you.
            </Heading>
            <NextLink href="/login">
              <Button
                my={4}
                alignSelf="start"
                variant="solid"
                colorScheme="secondary"
                // _hover={{ bg: "whiteAlpha.200" }}
              >
                Start for Free
              </Button>
            </NextLink>
          </Box>
        </Flex>
        <Box bg="primary.200" p={16}>
          <Heading
            margin="0 auto"
            color="secondary.500"
            size="lg"
            w="100%"
            maxW="620px"
          >
            Vernos is designed for user comfort. Many website builders can be
            confusing and difficult to learn. Vernos is simple to use, yet will
            still give you a great looking personal portfolio in seconds!
          </Heading>
        </Box>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bg="primary.50"
          p="16"
          spacing={6}
        >
          <StepLabel step="01" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Add Your Content
          </Heading>
          <Box rounded="xl" p={{ base: 0, md: 16 }} bg="primary.200">
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Video src={"/vernos-content.webm"} isActive autoPlay />
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bg="primary.200"
          p="16"
          spacing={6}
        >
          <StepLabel step="02" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Choose a Template
          </Heading>
          <Box rounded="xl" p={{ base: 0, md: 16 }} bg="primary.50">
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Video src={"/vernos-templates.webm"} isActive autoPlay />
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bg="primary.50"
          p="16"
          spacing={6}
        >
          <StepLabel step="03" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Publish
          </Heading>
          <Box rounded="xl" p={{ base: 0, md: 16 }} bg="primary.200">
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Video src={"/vernos-publish.webm"} isActive autoPlay />
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bg="primary.200"
          p="16"
          spacing={6}
          h="100vh"
        >
          <TemplatePreviewer height="100%" w="70%" margin="0 auto" />
        </Stack>
      </Box>
    </MouseProvider>
  );
};

const StepLabel = ({ step }) => {
  return (
    <Stack zIndex={-1} pos="absolute" top={6} left={6} spacing={0}>
      <Heading color="primary.400" mx={2} mb={-3} size="xl" fontSize="3xl">
        STEP
      </Heading>
      <Heading
        size="4xl"
        fontSize="8xl"
        color="transparent"
        style={{
          WebkitTextStroke: "1px var(--chakra-colors-primary-400)",
        }}
      >
        {step}
      </Heading>
    </Stack>
  );
};

const TemplatePreviewer = ({ ...otherProps }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <MockBrowser url="https://austinmalerba.vernos.us" {...otherProps}>
      <Flex direction="column" h="100%">
        <Box flex={1} pos="relative">
          {!selectedTemplate && (
            <Center bg="primary.50" pos="absolute" inset={0}>
              <Heading
                textAlign="center"
                color="secondary.500"
                size="xl"
                maxW="500px"
              >
                Select some templates below and try them out!
              </Heading>
            </Center>
          )}
          {selectedTemplate && (
            <>
              <Center bg="primary.50" pos="absolute" inset={0}>
                <Spinner color="secondary.300" />
              </Center>
              <Embed
                src={`${getHostingUrl({ template: selectedTemplate })}`}
                height="100%"
                width="100%"
                scale={0.7}
                bg="transparent"
              />
            </>
          )}
        </Box>
        <HStack spacing={2} h="100px" p={2} bgColor="white">
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
      </Flex>
    </MockBrowser>
  );
};

export default Landing;
