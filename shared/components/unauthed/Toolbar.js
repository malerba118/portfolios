import NextLink from "next/link";
import { Box, Flex, Heading, Image, HStack } from "@chakra-ui/react";
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
      justifyContent="space-between"
      overflow="hidden"
      color="blackAlpha.800"
      fontWeight="bold"
      pos="relative"
    >
      <Heading
        size="sm"
        pos="absolute"
        left="50%"
        transform="translateX(-50%)"
        display="inline-block"
      >
        <NextLink href="/">
          <Image cursor="pointer" src="/branding/logo.svg" w={"240px"} />
        </NextLink>
      </Heading>
      <HStack spacing={8}>
        <NextLink href="/about">
          <Link>About</Link>
        </NextLink>
        <NextLink href="/pricing">
          <Link>Pricing</Link>
        </NextLink>
      </HStack>
      <HStack spacing={8}>
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
