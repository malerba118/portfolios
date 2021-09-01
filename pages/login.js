import React, { useState } from "react";
import Link from "next/link";
import firebaseClient from "client/firebase";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Input,
  Icon,
} from "@chakra-ui/react";
import { Toolbar } from "shared/components/unauthed";
import { getCommonSsrProps } from "server/utils/ssr";
import InputContainer from "shared/components/InputContainer";
import { IoLogoGoogle as GoogleIcon } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { MotionButton } from "shared/components/animation";

const provider = new firebaseClient.auth.GoogleAuthProvider();

export const getServerSideProps = async (ctx) => {
  return {
    props: await getCommonSsrProps(ctx),
  };
};

export default (_props) => {
  const router = useRouter();
  const [mode, setMode] = useState("sign-up");

  return (
    <Flex direction="column" h="100vh" w="100%" bg="purple.600">
      <Toolbar />
      <Center flex={1}>
        <Stack
          spacing={4}
          rounded="md"
          w="100%"
          maxW="380px"
          align="center"
          bg="whiteAlpha.900"
          p={8}
          overflow="hidden"
        >
          <Heading
            fontWeight="600"
            fontSize={30}
            textAlign="center"
            color="purple.600"
          >
            Welcome to Vernos
          </Heading>
          <Button
            w="100%"
            colorScheme="purple"
            onClick={async () => {
              await firebaseClient.auth().signInWithPopup(provider);
              if (router.query.from) {
                window.location.href = router.query.from;
              } else {
                window.location.href = "/";
              }
            }}
          >
            <Icon mb="2px" fontSize="xl" as={GoogleIcon} />
            <Text ml={"8px"} mt={"4px"}>
              Continue with Google
            </Text>
          </Button>
          <Text color="gray.400">---------- OR ----------</Text>
          <InputContainer w="100%" label="Email">
            <Input fontSize="sm" placeholder="Email" />
          </InputContainer>
          <InputContainer w="100%" label="Password">
            <Input fontSize="sm" type="password" placeholder="Password" />
          </InputContainer>
          {mode === "sign-up" && (
            <MotionButton key="sign-up-button" w="100%" colorScheme="purple">
              Sign Up
            </MotionButton>
          )}
          {mode === "sign-in" && (
            <MotionButton key="sign-in-button" w="100%" colorScheme="purple">
              Sign In
            </MotionButton>
          )}
          {mode === "sign-up" && (
            <Text alignSelf="flex-start">
              Already have an account?{" "}
              <Button
                colorScheme="purple"
                variant="link"
                onClick={() => setMode("sign-in")}
              >
                Sign In
              </Button>
            </Text>
          )}
          {mode === "sign-in" && (
            <Text alignSelf="flex-start">
              Don't have an account?{" "}
              <Button
                colorScheme="purple"
                variant="link"
                onClick={() => setMode("sign-up")}
              >
                Sign Up
              </Button>
            </Text>
          )}
        </Stack>
      </Center>
    </Flex>
  );
};
