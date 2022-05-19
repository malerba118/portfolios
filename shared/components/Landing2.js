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
  Img,
  Center,
  chakra,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Waypoint } from "react-waypoint";
import { Toolbar, MockBrowser } from "./unauthed";
import { useElementScroll, useTransform, useSpring } from "framer-motion";
import { MotionBox } from "./animation";
import Preload from "preload-it";
import Entrance from "./animation/Entrance";
import { Scroll } from "../../scrollex";

const ScrollItem = chakra(Scroll.Item);
const ScrollSection = chakra(Scroll.Section);
const ScrollContainer = chakra(Scroll.Container);

const TEMPLATE_PERSONAS = {
  gallery: "wedding",
  skrol: "fitness",
  reveal: "wedding",
  circles: "architect",
  os: "computerEngineer",
  madrid: "architect",
};

const INTRO_PHRASES = [
  "Who needs a resume...",
  "when you have a website?",
  "Showcase your work",
  "Showcase yourself",
  "Good-looking portfolios",
  "Easy to build",
  "Publish in seconds",
];

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

const keyframe = {
  0: {
    translateY: 100,
  },
  100: {
    translateY: 0,
  },
  900: {
    translateY: 0,
  },
  1000: {
    translateY: -100,
  },
};

const keyframes = {
  intro: {
    phraseContainer: ({ section, container }) => ({
      [section.topAt("container-top")]: {
        translateY: 0,
      },
      [section.topAt("container-top") + container.height]: {
        translateY: 0,
      },
      [section.topAt("container-top") + container.height * 2]: {
        translateY: -300,
      },
    }),
    phrase: ({ section, container, data }) => ({
      [section.topAt("container-top") + data.index * container.height]: {
        translateY: 200,
      },
      [section.topAt("container-top") + data.index * container.height + 100]: {
        translateY: 0,
      },
      [section.topAt("container-top") +
      data.index * container.height +
      container.height -
      100]: {
        translateY: 0,
      },
      [section.topAt("container-top") +
      data.index * container.height +
      container.height]: {
        translateY: -200,
      },
    }),
  },
  steps: {},
  demo: {},
};

const Landing = ({}) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <ScrollContainer h="100vh">
      <ScrollSection>
        <ScrollItem h="100vh">
          <Stack h="100%" spacing={0}>
            <Entrance initialOpacity={0} delay={1.6} damping={300}>
              <Toolbar />
            </Entrance>
            <Center flex={1} w="100%" pb={36}>
              <Stack alignItems="center">
                <Entrance initialY={200}>
                  <Heading size="7xl">We see you</Heading>
                </Entrance>
                <Entrance initialY={120} delay={0.4}>
                  <Heading size="xl">and so will your next employer</Heading>
                </Entrance>
                <Entrance initialY={40} delay={0.8}>
                  <Text fontSize="lg" pt={4}>
                    Make a beautiful portfolio site in seconds.
                  </Text>
                </Entrance>
                <Entrance initialOpacity={0} initialY={60} delay={1.2}>
                  <Center py={4} px={2}>
                    <Button
                      color="black"
                      py={6}
                      px={6}
                      colorScheme="red"
                      rounded="lg"
                    >
                      Get Started for Free
                    </Button>
                  </Center>
                </Entrance>
              </Stack>
            </Center>
            <Entrance initialOpacity={0} delay={1.6} damping={300}>
              <Img
                pos="absolute"
                bottom={8}
                left={-4}
                src="/branding/character_telescope.svg"
                h={44}
              />
              <Img
                pos="absolute"
                bottom={8}
                right={0}
                src="/branding/character_guitar.svg"
                h={64}
              />
            </Entrance>
          </Stack>
        </ScrollItem>
      </ScrollSection>
      <ScrollSection showOverflow h="700vh" pageId="page-two">
        <Center pos="sticky" top={0} h="100vh" spacing={0}>
          <ScrollItem
            border="4px solid red"
            keyframes={keyframes.intro.phraseContainer}
            springs={{
              translateY: { damping: 100, mass: 1, stiffness: 500 },
            }}
            position="relative"
            overflow="hidden"
            w="100vw"
            h="100px"
          >
            {/* <Heading size="3xl" textTransform="uppercase">
              Tell us about you
            </Heading> */}
            {INTRO_PHRASES.map((phrase, index) => (
              <ScrollItem
                keyframes={keyframes.intro.phrase}
                position="absolute"
                data={{ index }}
                w="100vw"
              >
                <Heading
                  size="3xl"
                  textTransform="uppercase"
                  textAlign="center"
                >
                  {phrase}
                </Heading>
              </ScrollItem>
            ))}
          </ScrollItem>
        </Center>
      </ScrollSection>
    </ScrollContainer>
  );
};

export default Landing;
