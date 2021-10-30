import NextLink from "next/link";
import {
  Box,
  Flex,
  Heading,
  Image,
  HStack,
} from "@chakra-ui/react";
import Link from "../Link";
import { useAuth } from "client/useAuth";

const Toolbar = () => {
  const user = useAuth();
  return (
    <Flex
      px={{ base: 8, md: 24 }}
      h="100px"
      minH="100px"
      alignItems="center"
      overflow="hidden"
      color="secondary.500"
      fontWeight="bold"
    >
      <Heading size="sm" mb="6px">
        <NextLink href="/">
          <Image cursor="pointer" src="/vernos-white.svg" w={"80px"} />
        </NextLink>
      </Heading>
      <Box flex={1} />
      <HStack spacing={6}>
        <NextLink href="/pricing">
          <Link>Pricing</Link>
        </NextLink>
        {!user && (
          <NextLink href="/login?mode=sign-in">
            <Link>Sign In</Link>
          </NextLink>
        )}
         {!user && (
          <NextLink href="/login?mode=sign-up">
            <Link>Sign Up</Link>
          </NextLink>
        )}
        {user && (
          <NextLink href="/">
            <Link>Editor</Link>
          </NextLink>
        )}
      </HStack>
    </Flex>
  );
};

export default Toolbar;
