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
import { Scroll, useScrollState } from "scrollex";
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
  bannerOne: {
    iconSpiral: ({ section, container }) => ({
      [section.topAt("container-bottom") - 200]: {
        translateY: "-50px",
        translateX: "70px",

        rotateZ: "0deg",
      },
      [section.bottomAt("container-bottom") + 200]: {
        translateY: "100px",
        translateX: "0px",
        rotateZ: "-90deg",
      },
    }),
  },
  steps: {
    roundedStar: ({ section, container }) => ({
      [section.topAt("container-bottom")]: {
        rotateZ: "20deg",
        translateX: "-33%",
      },
      [section.bottomAt("container-top")]: {
        rotateZ: "180deg",
      },
    }),
  },
};

const Landing = ({}) => {
  return (
    <ScrollContainer h="100vh">
      <IntroSection />
      <TemplateDemoSection />
      <BannerOneSection />
      <StepsSection />
      {/* <Box h="100vh"></Box> */}
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
    <ScrollSection h="100vh">
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
    <ScrollSection h="1000vh" w="100%">
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
        pos="relative"
      >
        <ScrollItem
          pos="absolute"
          right="-28"
          top="-28"
          keyframes={keyframes.bannerOne.iconSpiral}
        >
          <Img
            w={{ base: "200px", md: "300px" }}
            src="/branding/icon-spiral.svg"
          />
        </ScrollItem>

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

const StepsSection = ({}) => {
  return (
    <ScrollSection h="1000vh" w="100%">
      <StepsSectionInner />
    </ScrollSection>
  );
};

const steps = [
  {
    title: "Add Your Content",
    description:
      "Share all about projects you’ve worked on, past work experiences, degrees and certifications you’ve earned!",
    character: "",
    image: "/templates/reveal.png",
  },
  {
    title: "Choose a Template",
    description: "Pick the template that looks best with your content",
    character: "",
    image: "/templates/circles.png",
  },
  {
    title: "Customize Your Theme",
    description:
      "Tweak fonts, colors, and other details until it feels like your own!",
    character: "",
    image: "/templates/reveal.png",
  },
  {
    title: "Publish!",
    description: "Publish your site and share it with the world!",
    character: "",
    image: "/templates/circles.png",
  },
];

const StepsSectionInner = () => {
  const selectedIndex = useScrollState(({ section, position, container }) => {
    const index = Math.floor(
      (position - section.topAt("container-top")) /
        ((section.height - container.height) / steps.length)
    );
    return clamp(index, 0, steps.length - 1);
  });

  const currentStep = steps[selectedIndex || 0];

  return (
    <Box pos="sticky" top={0} h="100vh" overflow="hidden">
      <ScrollItem
        keyframes={keyframes.steps.roundedStar}
        top="-5%"
        h="110%"
        pos="absolute"
        display="inline-block"
        zIndex={-1}
      >
        <Img src="/branding/rounded-star.svg" h="100%" w="100%" />
      </ScrollItem>
      <HStack display="flex" h="100%">
        <Stack flex={1} p="10">
          <Heading fontSize="6xl"> {currentStep.title}</Heading>
          <Text fontSize="xl" w="70%">
            {currentStep.description}
          </Text>
          <Img src={currentStep.character} />
        </Stack>
        <Box flex={1}>
          <Img
            minW="120%"
            minH="50vh"
            src={currentStep.image}
            objectFit="cover"
            objectPosition="left"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default Landing;
