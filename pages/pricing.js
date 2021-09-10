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

const provider = new firebaseClient.auth.GoogleAuthProvider();

export const getServerSideProps = async (ctx) => {
  let config = {};
  config.props = await getCommonSsrProps(ctx);
  return config;
};

const ProductCard = ({ children }) => {
  return (
    <Box rounded="md" width="300px" bg="whiteAlpha.900" p={6}>
      {children}
    </Box>
  );
};

const Pricing = (props) => {
  const router = useRouter();
  const user = useAuth();

  const handleUpgradeClick = async (e) => {
    try {
      const { sessionId } = await api.account.createCheckoutSession();
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert(error.message);
    }
  };

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
      <Center flex={1}>
        <Box>
          <Heading color="white" textAlign="center" size="4xl">
            Pricing
          </Heading>
          <SimpleGrid p={8} columns={{ base: 1, md: 2 }} spacing={8}>
            <ProductCard>
              <Stack spacing={4}>
                <Heading size="lg" color="purple.600">
                  Free
                </Heading>
                <Heading size="xl">$0</Heading>
                <Text>Best for those just looking to experiment.</Text>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Publishing with Ads
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Some Templates
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Theme Customization
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Contact Form Submission
                    </Text>
                  </ListItem>
                </List>
                {!user && (
                  <Button
                    onClick={() => {
                      router.push(
                        `/login?from=${encodeURIComponent("/pricing")}`
                      );
                    }}
                    colorScheme="purple"
                  >
                    Get Started
                  </Button>
                )}
                {user && (
                  <Button
                    onClick={() => {
                      router.push(`/`);
                    }}
                    colorScheme="purple"
                  >
                    Continue
                  </Button>
                )}
              </Stack>
            </ProductCard>
            <ProductCard>
              <Stack spacing={4}>
                <Heading size="lg" color="purple.600">
                  Premium
                </Heading>
                <HStack align="center">
                  <Heading size="xl">$4</Heading>
                  <Text size="sm">/month</Text>
                </HStack>
                <Text>
                  Best for those looking to host a portfolio site for a
                  prolonged time.
                </Text>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Publishing <b>without</b> Ads
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      <b>All</b> Templates
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Theme Customization
                    </Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiCheckCircle} color="green.500" />
                    <Text as="span" fontSize="sm">
                      Contact Form Submission
                    </Text>
                  </ListItem>
                </List>
                {!user && (
                  <Button
                    onClick={() => {
                      router.push(
                        `/login?from=${encodeURIComponent("/pricing")}`
                      );
                    }}
                    colorScheme="purple"
                  >
                    Get Started
                  </Button>
                )}
                {user && (
                  <>
                    {user.subscription?.status === "active" && (
                      <Button onClick={() => {}} colorScheme="purple">
                        Manage Subscription
                      </Button>
                    )}
                    {user.subscription?.status !== "active" && (
                      <Button onClick={handleUpgradeClick} colorScheme="purple">
                        Upgrade
                      </Button>
                    )}
                  </>
                )}
              </Stack>
            </ProductCard>
          </SimpleGrid>
        </Box>
      </Center>
    </Flex>
  );
};

export default Pricing;
