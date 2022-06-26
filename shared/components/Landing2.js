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
import {
  useElementScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { MotionHeading } from "./animation";
import Preload from "preload-it";
import Entrance from "./animation/Entrance";
import { Scroll, useScrollState } from "../../scrollex";
import { templateNames } from "shared/utils/data";
import { clamp } from "lodash";

const ScrollItem = chakra(Scroll.Item);
const ScrollSection = chakra(Scroll.Section);
const ScrollContainer = chakra(Scroll.Container);

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
  templates: {
    images: ({ section, container }) => ({
      [section.topAt("container-top")]: {
        translateX: "0%",
      },
      [section.bottomAt("container-bottom")]: {
        translateX: "-100%",
      },
    }),
  },
  steps: {},
  demo: {},
};

const Landing = ({}) => {
  return (
    <ScrollContainer h="100vh">
      <IntroSection />
      <TemplateDemoSection />
      <BannerOneSection />
      {/**
            <TemplateDemoSection />

      <CTA1Section />
      <StepsSection />
      <CTA2Section />
      <FooterSection />
     */}
    </ScrollContainer>
  );
};

const IntroSection = ({}) => {
  return (
    <ScrollSection showOverflow h="100vh">
      <Toolbar />
      <Flex h="calc(100% - 100px)">
        <Box bg="blue.300" flex={1}>
          <Stack p={16}>
            <Heading size="6xl" color="white">
              THE BEST WAY TO&nbsp;
              <Box position="relative" display="inline-block">
                <Image src="/branding/circle.svg" position="absolute"></Image>
                SHOWCASE
              </Box>
              &nbsp;YOUR WORK
            </Heading>
            <Text fontSize="3xl" color="white">
              create a beautiful portfolio in seconds
            </Text>
            <Button colorScheme="pink" w="fit-content">
              Start for free
            </Button>
          </Stack>
        </Box>
        <Center
          bg="pink.100"
          flex={1}
          display={{ base: "none", md: "flex" }}
          position="relative"
        >
          <Image
            src="/branding/intro-page-img.png"
            h="100%"
            objectFit="contain"
          ></Image>
          <Image
            src="/branding/character_magnifier.svg"
            position="absolute"
            left={2}
            bottom={2}
            w="clamp(150px, 40%, 230px)"
          ></Image>
        </Center>
      </Flex>
    </ScrollSection>
  );
};

const items = [
  "Who needs a resume...",
  "when you have a portfolio site?",
  "so what are you proud of?",
  "go on and show the world!",
];

const variants = {
  heading: {
    initial: {
      y: 100,
    },
    active: {
      y: 0,
    },
    exit: {
      y: -100,
    },
  },
};

const inverseVariants = {
  heading: {
    initial: {
      y: -100,
    },
    active: {
      y: 0,
    },
    exit: {
      y: 100,
    },
  },
};

const TemplateDemoSectionInner = () => {
  const selectedIndex = useScrollState(({ section, position, container }) => {
    const index = Math.floor(
      (position - section.topAt("container-top")) /
        ((section.height - container.height) / items.length)
    );
    return clamp(index, 0, items.length - 1);
  });

  const scrollDirection = useScrollState(({ velocity }) => {
    if (velocity >= 0) return "down";
    else {
      return "up";
    }
  });

  const headingVariants =
    scrollDirection === "down" ? variants.heading : inverseVariants.heading;

  const phraseColor =
    selectedIndex == items.length - 1 ? "orange.300" : "black";

  return (
    <Stack h="100vh" pos="sticky" top={0}>
      <Box pt={16}>
        <Box overflow="hidden">
          <AnimatePresence exitBeforeEnter>
            <MotionHeading
              key={selectedIndex}
              size="6xl"
              textAlign="center"
              variants={headingVariants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.1,
              }}
              textTransform="uppercase"
              color={phraseColor}
            >
              {items[selectedIndex]}
            </MotionHeading>
          </AnimatePresence>
        </Box>
      </Box>
      <Center flex={1} w="100%">
        <Box h="400px" w="0px">
          <ScrollItem
            display="flex"
            keyframes={keyframes.templates.images}
            w="max-content"
            gap={8}
          >
            {templateNames.map((template) => (
              <Image
                key={template}
                // marginRight={"24px"}
                // w="calc(600px - 24px)"
                w="600px"
                h="400px"
                objectFit="contain"
                src={"/templates/" + template + ".png"}
                alt={template + ".png"}
              />
            ))}
          </ScrollItem>
        </Box>
        <Image
          alt="little guy with telescope looking at templates"
          src="branding/character_telescope.svg"
          position="absolute"
          left={10}
          bottom={8}
          w="clamp(150px, 40%, 230px)"
        ></Image>
      </Center>
    </Stack>
  );
};

const TemplateDemoSection = ({}) => {
  return (
    <ScrollSection h="1000vh" w="100%" showOverflow>
      <TemplateDemoSectionInner />
    </ScrollSection>
  );
};

const BannerOneSection = ({}) => {
  return (
    <ScrollSection>
      <Center
        padding={12}
        bg="green.600"
        // hidden on smalls screens
        display={{ base: "none", lg: "flex" }}
      >
        <Stack>
          <Heading color="yellow.300" size="6xl" textTransform="uppercase">
            creating a portfolio
          </Heading>
          <HStack spacing={6}>
            <Img
              w={{ base: "200px", md: "300px" }}
              src="/branding/character_chilling.svg"
            />
            <Stack>
              <Heading color="yellow.300" size="6xl" textTransform="uppercase">
                has never been so easy
              </Heading>
              <HStack>
                <Box flex={1}></Box>
                <Button colorScheme="pink" w="fit-content">
                  Start for free
                </Button>
              </HStack>
            </Stack>
          </HStack>
        </Stack>
      </Center>
      <Center
        padding={12}
        bg="green.600"
        // hidden on big screens
        display={{ base: "flex", lg: "none" }}
      >
        <Stack spacing={6} alignItems="center">
          <Heading
            color="yellow.300"
            size="6xl"
            textAlign="center"
            textTransform="uppercase"
          >
            creating a portfolio has never been so easy
          </Heading>
          <Img
            w={{ base: "200px", md: "300px" }}
            src="/branding/character_chilling.svg"
          />
          <Button colorScheme="pink" w="fit-content">
            Start for free
          </Button>
        </Stack>
      </Center>
    </ScrollSection>
  );
};

const OldLanding = ({}) => {
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
                key={phrase}
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
