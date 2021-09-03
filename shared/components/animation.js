import { motion } from "framer-motion";
import {
  Box,
  Image,
  Flex,
  Stack,
  Heading,
  Button,
  Link,
} from "@chakra-ui/react";

export const MotionBox = motion(Box);
export const MotionImage = motion(Image);
export const MotionFlex = motion(Flex);
export const MotionStack = motion(Stack);
export const MotionHeading = motion(Heading);
export const MotionButton = motion(Button);
export const MotionLink = motion(Link);

export const transitions = {
  one: (duration = 0.6) => ({
    duration,
    ease: [0.6, 0.01, -0.05, 0.9],
  }),
  two: (duration = 0.6) => ({
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
  }),
};
