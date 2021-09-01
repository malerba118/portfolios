import Link from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import * as styles from "../../utils/styles";
import { MotionFlex, transitions } from "../animation";

const Toolbar = () => {
  return (
    <Flex
      px={24}
      h={"100px"}
      alignItems="center"
      overflow="hidden"
      color="white"
      fontWeight="bold"
    >
      <Heading size="sm">
        <Link href="/">
          <Image cursor="pointer" src="/vernos-white.svg" w={"80px"} />
        </Link>
      </Heading>
      <Box flex={1} />
      <HStack spacing={8}>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Sign Up</Link>
      </HStack>
    </Flex>
  );
};

export default Toolbar;
