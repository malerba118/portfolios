import NextLink from "next/link";
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
import Link from "../Link";

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
        <NextLink href="/">
          <Image cursor="pointer" src="/vernos-white.svg" w={"80px"} />
        </NextLink>
      </Heading>
      <Box flex={1} />
      <HStack spacing={8}>
        <NextLink href="/pricing">
          <Link>Pricing</Link>
        </NextLink>
        <NextLink href="/about">
          <Link>About</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Sign Up</Link>
        </NextLink>
      </HStack>
    </Flex>
  );
};

export default Toolbar;
