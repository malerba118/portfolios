import NextLink from "next/link";
import {
  Box,
  Flex,
  Heading,
  Image,
  HStack,
  Divider,
  useBreakpointValue,
  useBreakpoint,
} from "@chakra-ui/react";
import Link from "../Link";
import { useAuth } from "client/useAuth";

const Toolbar = () => {
  const user = useAuth();
  const img = useBreakpointValue({
    base: {
      src: "/branding/logo-icon.svg",
      width: "60px",
    },
    md: {
      src: "/branding/logo.svg",
      width: "220px",
    },
  });

  return (
    <Flex
      px={{ base: 4, md: 24 }}
      h="100px"
      minH="100px"
      alignItems="center"
      justifyContent="space-between"
      overflow="hidden"
      color="blackAlpha.800"
      fontWeight="bold"
      pos="relative"
    >
      {/*
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
      </Heading> */}

      <HStack spacing={8}>
        <NextLink href="/">
          <Image
            key={img.src}
            cursor="pointer"
            src={img.src}
            w={img.width}
            minW="60px"
          />
        </NextLink>
      </HStack>
      <HStack spacing={{ base: 3, md: 8 }}>
        <NextLink href="/about">
          <Link>About</Link>
        </NextLink>
        <NextLink href="/pricing">
          <Link>Pricing</Link>
        </NextLink>
        <Box bgColor={"black"} w="2px" h="30px" />
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
        {/**
                {user && (
          <NextLink href="/">
            <Link>
              Hi, {user.name}!{" "}
              <Image src="/branding/logo.svg" w={"240px"} />
            </Link>
          </NextLink>
        )}
       */}
      </HStack>
    </Flex>
  );
};

export default Toolbar;
