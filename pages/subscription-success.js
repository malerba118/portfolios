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
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { Toolbar } from "shared/components/unauthed";
import { getCommonSsrProps } from "server/utils/ssr";
import { useAuth } from "client/useAuth";
import { BiCheckCircle } from "react-icons/bi";
import * as api from "client/api";
import getStripe from "client/stripe";

export const getServerSideProps = async (ctx) => {
  let config = {};
  config.props = await getCommonSsrProps(ctx);
  return config;
};

const SubscriptionSuccess = (props) => {
  const user = useAuth();
  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100%"
      style={{
        height: "100vh",
        backgroundColor: "var(--chakra-colors-purple-600)",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/worn-dots.png")',
        backgroundBlendMode: "overlay",
        backgroundSize: "20%",
      }}
    >
      <Toolbar />
      <Center flex={1} flexDirection="column">
        <Heading maxW="900" color="white" textAlign="center" size="3xl">
          Congrats, you're ready to make an awesome portfolio!
        </Heading>
        <Button m={8} colorScheme="purple">
          Go to Editor
        </Button>
      </Center>
    </Flex>
  );
};

export default SubscriptionSuccess;
