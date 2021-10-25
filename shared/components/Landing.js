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
import { Waypoint } from "react-waypoint";
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

const TEMPLATE_PERSONAS = {
  gallery: "wedding",
  skrol: "fitness",
  circles: "architect",
  os: "computerEngineer",
  madrid: "architect",
  venice: "architect",
};

const VIDEO_URLS = {
  content:
    "https://firebasestorage.googleapis.com/v0/b/vernos-prod.appspot.com/o/add-content-3.mp4?alt=media&token=66217003-5347-4505-b367-6c88dfb110b6",
  templates:
    "https://firebasestorage.googleapis.com/v0/b/vernos-prod.appspot.com/o/choose-template-3.mp4?alt=media&token=04cdec97-902d-40b1-b225-6a9b304bad15",
  publish:
    "https://firebasestorage.googleapis.com/v0/b/vernos-prod.appspot.com/o/publish-3.mp4?alt=media&token=7876ec68-debe-4e1b-abbb-453fd3ff0caf",
};

const preload = Preload();

const Video = ({ src, type = "video/mp4", isActive, autoPlay, style }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isActive && autoPlay) {
        ref.current.currentTime = 0;
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isActive, autoPlay]);

  return (
    <video style={style} ref={ref} muted loop autoPlay playsInline controls>
      <source type={type} src={src} />
    </video>
  );
};

const Landing = ({}) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <MouseProvider>
      <Box>
        <Flex h="100vh" direction="column" pos="relative" overflow="hidden">
          <Box
            pos="absolute"
            left="-300px"
            top="-300px"
            w="700px"
            zIndex={-1}
            transform="scale(1.3)"
          >
            <MouseGravity opacity={0.66} amount={-11}>
              {blobs[0]}
            </MouseGravity>
          </Box>
          <Box
            pos="absolute"
            bottom="-200px"
            right="-150px"
            w="500px"
            zIndex={-1}
            transform="scale(1.2)"
          >
            <MouseGravity opacity={0.66} amount={-8}>
              {blobs[0]}
            </MouseGravity>
          </Box>
          <Toolbar />
          <Flex
            flex={1}
            px={{ base: 8, md: 24 }}
            mb={24}
            color="secondary.500"
            maxW={{ base: "100%", md: "80%" }}
            direction="column"
            justify="center"
          >
            <Box>
              <Heading size="4xl">
                Build a <br /> Portfolio Site <br />
                in Seconds
              </Heading>
              <Heading w="70%" my={2} fontSize={{ base: "md", md: "2xl" }}>
                Don't have the time/energy to build a personal website? Let
                Vernos do it for you!
              </Heading>
              <Box my={4} rounded="4px" bg="primary.300" display="inline-block">
                <MouseGravity amount={4} maxDisplacement={8}>
                  <NextLink href="/login">
                    <Button
                      alignSelf="start"
                      variant="solid"
                      colorScheme="primary"
                      // _hover={{ bg: "whiteAlpha.200" }}
                      rounded="4px"
                    >
                      Start for Free
                    </Button>
                  </NextLink>
                </MouseGravity>
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Box bgColor="primary.200" px={{ base: 8, md: 24 }} py={16}>
          <Heading
            margin="0 auto"
            color="secondary.500"
            size="lg"
            w="100%"
            maxW="620px"
          >
            Many website builders are confusing and tedious to learn. Vernos is
            simple to use, yet will give you a beautiful personal portfolio in
            seconds. Here's how it works!
          </Heading>
        </Box>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bgColor="primary.50"
          p={{ base: 8, md: 24 }}
          spacing={6}
          {...textures.speckles}
        >
          <StepLabel step="01" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Add Your Content
          </Heading>
          <Box rounded="xl" p={{ base: 0, md: 16 }} bg="primary.200">
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Waypoint onEnter={() => setActiveVideo("content")}>
                  <AspectRatio ratio={16 / 9} width="100%">
                    <Video
                      src={VIDEO_URLS["content"]}
                      type="video/mp4"
                      isActive={activeVideo === "content"}
                      autoPlay
                      style={{ width: "100%", borderRadius: "0 0 4px 4px" }}
                    />
                  </AspectRatio>
                </Waypoint>
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bgColor="primary.200"
          p={{ base: 8, md: 24 }}
          spacing={6}
          // {...textures.speckles}
        >
          <StepLabel step="02" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Choose a Template
          </Heading>
          <Box
            rounded="xl"
            p={{ base: 0, md: 16 }}
            bg="primary.50"
            {...textures.speckles}
          >
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Waypoint onEnter={() => setActiveVideo("templates")}>
                  <AspectRatio ratio={16 / 9} width="100%">
                    <Video
                      src={VIDEO_URLS["templates"]}
                      isActive={activeVideo === "templates"}
                      autoPlay
                      style={{ width: "100%", borderRadius: "0 0 4px 4px" }}
                    />
                  </AspectRatio>
                </Waypoint>
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bgColor="primary.50"
          p={{ base: 8, md: 24 }}
          spacing={6}
          {...textures.speckles}
        >
          <StepLabel step="03" />
          <Heading textAlign="center" color="secondary.500" size="4xl">
            Publish!
          </Heading>
          <Box rounded="xl" p={{ base: 0, md: 16 }} bg="primary.200">
            <Stack spacing={6}>
              <MockBrowser url={"https://vernos.app"}>
                <Waypoint onEnter={() => setActiveVideo("publish")}>
                  <AspectRatio ratio={16 / 9} width="100%">
                    <Video
                      src={VIDEO_URLS["publish"]}
                      isActive={activeVideo === "publish"}
                      autoPlay
                      style={{ width: "100%", borderRadius: "0 0 4px 4px" }}
                    />
                  </AspectRatio>
                </Waypoint>
              </MockBrowser>
            </Stack>
          </Box>
        </Stack>
        <Stack
          pos="relative"
          zIndex={1}
          direction="column"
          bgColor="primary.200"
          p={{ base: 8, md: 16 }}
          spacing={6}
          h="100vh"
          // {...textures.speckles}
        >
          <TemplatePreviewer
            height="100%"
            w={{ base: "100%", md: "70%" }}
            margin="0 auto"
          />
        </Stack>
      </Box>
    </MouseProvider>
  );
};

const StepLabel = ({ step }) => {
  return (
    <Stack
      zIndex={-1}
      pos="absolute"
      top={{ base: 2, md: 8 }}
      left={{ base: 2, md: 8 }}
      display={{ base: "none", md: "block" }}
      spacing={0}
    >
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
  const src = `${getHostingUrl({
    template: selectedTemplate,
    persona: TEMPLATE_PERSONAS[selectedTemplate],
  })}`;

  return (
    <MockBrowser url="https://austinmalerba.vernos.us" {...otherProps}>
      <Flex direction="column" h="calc(100% - 32px)">
        <Box flex={1} pos="relative">
          {!selectedTemplate && (
            <Center
              bg="primary.50"
              {...textures.speckles}
              pos="absolute"
              inset={0}
              p={4}
            >
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
                key={src}
                src={src}
                height="100%"
                width="100%"
                scale={0.7}
                bg="transparent"
              />
            </>
          )}
        </Box>
        <HStack spacing={2} h="100px" p={2} bgColor="white" overflowX="auto">
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
