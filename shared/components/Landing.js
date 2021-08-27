import Link from "next/link";
import { Box, Stack, Flex, Text, Heading, Button } from "@chakra-ui/react";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Section from "./Section";
import FormSection from "./FormSection";
import InputContainer from "./InputContainer";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Toolbar, MockBrowser } from "./unauthed";
import { useElementScroll, useTransform, useSpring } from "framer-motion";
import { MotionBox } from "./animation";
import Preload from "preload-it";

const preload = Preload();

const createPageManager = (numPages) => {
  const pageSize = 1 / numPages;
  return {
    getPage(progress) {
      return Math.floor(progress / pageSize);
    },
  };
};

const pageManager = createPageManager(11);

const getVideoSrc = (page) => {
  if (page <= 4) {
    return "/vernos-content.webm";
  } else if (page <= 7) {
    return "/vernos-templates.webm";
  } else if (page <= 10) {
    return "/vernos-publish.webm";
  } else {
    return "/vernos-live.webm";
  }
};

const useRefFromId = (id, defaultValue) => {
  const ref = useRef(defaultValue);

  useLayoutEffect(() => {
    ref.current = document.getElementById(id);
  }, [id]);

  return ref;
};

const Landing = ({}) => {
  const ref = useRefFromId("parallax-scroll-container");
  const videoRef = useRef(null);
  const scroll = useElementScroll(ref);
  const [page, setPage] = useState(0);
  const scale = useTransform(scroll.scrollYProgress, [0.032, 0.075], [0.85, 1]);
  const springs = {
    scale: useSpring(scale, { mass: 0.02 }),
  };

  useEffect(() => {
    preload.fetch([
      "/vernos-content.webm",
      "/vernos-templates.webm",
      "/vernos-publish.webm",
      "/vernos-live.webm",
    ]);
  }, []);

  useEffect(() => {
    return scroll.scrollYProgress.onChange((progress) => {
      setPage(pageManager.getPage(progress));
    });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (page > 0) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [page]);

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
            <Heading w="75%" my={2} fontWeight="900" fontSize="2xl">
              You shouldn't have to spend your time learning how to build a
              website. That's why Vernos will just do it for you.
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
            w="60vw"
            bottom="32px"
            style={{ scale: springs.scale }}
          >
            <MockBrowser>
              <video
                key={getVideoSrc(page)}
                ref={(el) => {
                  if (el) {
                    el.playbackRate = 1.5;
                  }
                  videoRef.current = el;
                }}
                autoPlay={page > 0}
                muted
              >
                <source key={getVideoSrc(page)} src={getVideoSrc(page)} />
              </video>
            </MockBrowser>
          </MotionBox>
        </Flex>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Landing;
