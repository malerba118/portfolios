import { motion } from "framer-motion";
import { Box, Heading, Image } from "@chakra-ui/react";

export const MotionBox = motion(Box);
export const MotionImage = motion(Image);
export const MotionHeading = motion(Heading);

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
