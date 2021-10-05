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
  HStack,
  FormErrorMessage,
  FormControl,
  Box,
} from "@chakra-ui/react";
import { Toolbar } from "shared/components/unauthed";
import { getCommonSsrProps } from "server/utils/ssr";
import InputContainer from "shared/components/InputContainer";
import { IoLogoGoogle as GoogleIcon } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { MotionButton } from "shared/components/animation";
import { useMutation } from "react-query";

const provider = new firebaseClient.auth.GoogleAuthProvider();

export const getServerSideProps = async (ctx) => {
  let config = {};
  config.props = await getCommonSsrProps(ctx);
  if (config.props.user) {
    config.redirect = {
      destination: "/",
      permanent: false,
    };
  }
  return config;
};

const SignUpForm = ({ form, onChange, error, isLoading, onSubmit }) => {
  return (
    <FormControl isInvalid={!!error}>
      <Stack
        as="form"
        w="100%"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        spacing={4}
      >
        <InputContainer as="div" w="100%" label="Email">
          <Input
            value={form.email}
            onChange={(e) => {
              onChange({
                ...form,
                email: e.target.value,
              });
            }}
            fontSize="sm"
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer as="div" w="100%" label="Password">
          <Input
            value={form.password}
            onChange={(e) => {
              onChange({
                ...form,
                password: e.target.value,
              });
            }}
            fontSize="sm"
            type="password"
            placeholder="Password"
          />
        </InputContainer>
        <FormErrorMessage>{error}</FormErrorMessage>
        <MotionButton
          isLoading={isLoading}
          key="sign-up-button"
          w="100%"
          colorScheme="secondary"
          type="submit"
        >
          Sign Up
        </MotionButton>
      </Stack>
    </FormControl>
  );
};

const SignInForm = ({ form, onChange, error, isLoading, onSubmit }) => {
  return (
    <FormControl isInvalid={!!error}>
      <Stack
        as="form"
        w="100%"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        spacing={4}
      >
        <InputContainer as="div" w="100%" label="Email">
          <Input
            value={form.email}
            onChange={(e) => {
              onChange({
                ...form,
                email: e.target.value,
              });
            }}
            fontSize="sm"
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer as="div" w="100%" label="Password">
          <Input
            value={form.password}
            onChange={(e) => {
              onChange({
                ...form,
                password: e.target.value,
              });
            }}
            fontSize="sm"
            type="password"
            placeholder="Password"
          />
        </InputContainer>
        <FormErrorMessage>{error}</FormErrorMessage>
        <MotionButton
          isLoading={isLoading}
          key="sign-up-button"
          w="100%"
          colorScheme="secondary"
          type="submit"
        >
          Sign In
        </MotionButton>
      </Stack>
    </FormControl>
  );
};

const Login = (_props) => {
  const router = useRouter();
  const [mode, setMode] = useState("sign-up");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const mutations = {
    signUp: useMutation(({ email, password }) =>
      firebaseClient.auth().createUserWithEmailAndPassword(email, password)
    ),
    signIn: useMutation(({ email, password }) =>
      firebaseClient.auth().signInWithEmailAndPassword(email, password)
    ),
    googleSignIn: useMutation(
      () => firebaseClient.auth().signInWithPopup(provider),
      {
        onSuccess: () => {
          if (router.query.from) {
            window.location.href = router.query.from;
          } else {
            window.location.href = "/";
          }
        },
      }
    ),
  };

  return (
    <Flex direction="column" h="100vh" w="100%">
      <Toolbar />
      <Center flexDirection="column" flex={1}>
        <Heading color="secondary.500" textAlign="center" size="4xl">
          Welcome
        </Heading>
        <Stack
          m={8}
          spacing={4}
          rounded="md"
          w="100%"
          maxW="380px"
          align="center"
          bg="whiteAlpha.900"
          p={8}
          overflow="hidden"
        >
          <Button
            w="100%"
            colorScheme="secondary"
            isLoading={mutations.googleSignIn.isLoading}
            onClick={() => {
              mutations.googleSignIn.mutate();
            }}
          >
            <Icon mb="2px" fontSize="xl" as={GoogleIcon} />
            <Text ml={"8px"} mt={"4px"}>
              Continue with Google
            </Text>
          </Button>
          <HStack align="center">
            <Box h="2px" w="70px" bg="gray.300" />
            <Text color="gray.400">OR</Text>
            <Box h="2px" w="70px" bg="gray.300" />
          </HStack>
          {mode === "sign-up" && (
            <SignUpForm
              form={form}
              onChange={setForm}
              error={mutations.signUp.error?.message}
              onSubmit={(form) => mutations.signUp.mutate(form)}
              isLoading={mutations.signUp.isLoading}
            />
          )}
          {mode === "sign-in" && (
            <SignInForm
              form={form}
              onChange={setForm}
              error={mutations.signIn.error?.message}
              onSubmit={(form) => mutations.signIn.mutate(form)}
              isLoading={mutations.signIn.isLoading}
            />
          )}
          {/* {mode === "sign-up" && (
            <MotionButton
              isLoading={mutations.signUp.isLoading}
              key="sign-up-button"
              w="100%"
              colorScheme="secondary"
              onClick={() => mutations.signUp.mutate(form)}
            >
              Sign Up
            </MotionButton>
          )}
          {mode === "sign-in" && (
            <MotionButton
              isLoading={mutations.signIn.isLoading}
              key="sign-in-button"
              w="100%"
              colorScheme="secondary"
              onClick={() => mutations.signIn.mutate(form)}
            >
              Sign In
            </MotionButton>
          )} */}
          {mode === "sign-up" && (
            <Text alignSelf="flex-start">
              Already have an account?{" "}
              <Button
                type="submit"
                colorScheme="secondary"
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
                type="button"
                colorScheme="secondary"
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

export default Login;
