import Link from "next/link";
import { Box, Stack, Flex, Text, Heading, Button } from "@chakra-ui/react";
import React, { useRef, useLayoutEffect } from "react";
import Section from "./Section";
import FormSection from "./FormSection";
import InputContainer from "./InputContainer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Toolbar, MockBrowser } from "./unauthed";
import { useElementScroll, useTransform, useSpring } from "framer-motion";
import { MotionBox } from "./animation";

const useRefFromId = (id, defaultValue) => {
  const ref = useRef(defaultValue);

  useLayoutEffect(() => {
    ref.current = document.getElementById(id);
  }, [id]);

  return ref;
};

const Landing = ({}) => {
  const ref = useRefFromId("parallax-scroll-container");
  const scroll = useElementScroll(ref);
  const scale = useTransform(
    scroll.scrollYProgress,
    [0.0001, 0.075],
    [0.85, 1]
  );
  const springs = {
    scale: useSpring(scale, { mass: 0.02 }),
  };

  return (
    <Parallax
      id="parallax-scroll-container"
      pages={11}
      style={{
        height: "100vh",
        backgroundColor: "var(--chakra-colors-purple-600)",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/worn-dots.png")',
        backgroundBlendMode: "overlay",
        backgroundSize: "20%",
      }}
    >
      <ParallaxLayer offset={0} speed={0}>
        <Box pos="absolute" inset={0}>
          <Toolbar />
          <Box px={24} py={24} color="white">
            <Heading fontWeight="900" fontSize="7xl">
              Build a Portfolio Site in Seconds
            </Heading>
            <Heading my={2} fontWeight="900" fontSize="2xl">
              Vernos is the portfolio builder with no learning curve.
            </Heading>
            <Button
              my={4}
              alignSelf="start"
              variant="outline"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              Start for Free
            </Button>
          </Box>
        </Box>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0} sticky={{ start: 1, end: 4 }}>
        <Box pos="absolute" inset={0} bg="purple.500" color="white">
          <Stack pos="absolute" top={8} left={8} spacing={0}>
            <Heading mx={2} mb={-2} fontSize="3xl">
              STEP
            </Heading>
            <Heading
              fontSize="9xl"
              color="purple.500"
              textShadow="0px 0px 2px white"
            >
              01
            </Heading>
          </Stack>
          <Box pos="absolute" bottom={"36vw"} left={0} right={0}>
            <Heading textAlign="center" fontSize="7xl" color="white">
              Add Your Content
            </Heading>
          </Box>
        </Box>
      </ParallaxLayer>
      <ParallaxLayer sticky={{ start: 4, end: 7 }}>
        <Box pos="absolute" inset={0} bg="purple.600" color="white">
          <Stack pos="absolute" top={8} left={8} spacing={0}>
            <Heading mx={2} mb={-2} fontSize="3xl">
              STEP
            </Heading>
            <Heading
              fontSize="9xl"
              color="purple.600"
              textShadow="0px 0px 2px white"
            >
              02
            </Heading>
          </Stack>
          <Box pos="absolute" bottom={"36vw"} left={0} right={0}>
            <Heading textAlign="center" fontSize="7xl" color="white">
              Choose a Template
            </Heading>
          </Box>
        </Box>
      </ParallaxLayer>
      <ParallaxLayer sticky={{ start: 7, end: 10 }}>
        <Box pos="absolute" inset={0} bg="purple.500" color="white">
          <Stack pos="absolute" top={8} left={8} spacing={0}>
            <Heading mx={2} mb={-2} fontSize="3xl">
              STEP
            </Heading>
            <Heading
              fontSize="9xl"
              color="purple.500"
              textShadow="0px 0px 2px white"
            >
              03
            </Heading>
          </Stack>
          <Box pos="absolute" bottom={"36vw"} left={0} right={0}>
            <Heading textAlign="center" fontSize="7xl" color="white">
              Publish
            </Heading>
          </Box>
        </Box>
      </ParallaxLayer>
      <ParallaxLayer sticky={{ start: 10, end: 11 }}>
        <Box pos="absolute" inset={0} bg="purple.600" color="white">
          {/* <Stack pos="absolute" top={8} left={8} spacing={0}>
            <Heading mx={2} mb={-2} fontSize="3xl">
              STEP
            </Heading>
            <Heading
              fontSize="9xl"
              color="purple.600"
              textShadow="0px 0px 2px white"
            >
              03
            </Heading>
          </Stack> */}
          <Box pos="absolute" bottom={"36vw"} left={0} right={0}>
            <Heading textAlign="center" fontSize="7xl" color="white">
              That's it!
            </Heading>
          </Box>
        </Box>
      </ParallaxLayer>
      <ParallaxLayer
        style={{ pointerEvents: "none" }}
        sticky={{ start: 0.35, end: 10 }}
      >
        <Flex pos="absolute" inset={0} justify="center">
          <MotionBox
            pos="absolute"
            w="54vw"
            bottom="32px"
            style={{ scale: springs.scale }}
          >
            <MockBrowser>
              <video
                ref={(el) => {
                  if (el) {
                    el.playbackRate = 1.5;
                  }
                }}
                autoPlay
                muted
              >
                <source src={"/vernos-add-content.mov"} />
              </video>
            </MockBrowser>
          </MotionBox>
        </Flex>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Landing;
