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
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import * as api from "client/api";
import getStripe from "client/stripe";

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

  const handleManageSubscriptionClick = (e) => {
    router.push("/profile");
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100%"
      style={{
        height: "100vh",
        backgroundColor: "var(--chakra-colors-primary-50)",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
        backgroundBlendMode: "multiply",
        backgroundSize: "12%",
      }}
      overflow="auto"
    >
      <Toolbar />
      <Box pos="relative" flex={1}>
        <Center pos="absolute" inset={0}>
          <Box maxH="100%">
            <Heading color="secondary.500" textAlign="center" size="4xl">
              Pricing
            </Heading>
            <SimpleGrid p={8} columns={{ base: 1, md: 2 }} spacing={8}>
              <ProductCard>
                <Stack spacing={4}>
                  <Heading lineHeight=".9em" size="lg" color="secondary.500">
                    Free
                  </Heading>
                  <Heading lineHeight=".9em" size="xl">
                    $0
                  </Heading>
                  <Text>Best for those just looking to experiment.</Text>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text as="span" fontSize="sm">
                        Publishing
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text as="span" fontSize="sm">
                        Basic Templates
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text as="span" fontSize="sm">
                        Theme Customization
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiXCircle} color="red.500" />
                      <Text as="span" fontSize="sm">
                        Premium Templates
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiXCircle} color="red.500" />
                      <Text as="span" fontSize="sm">
                        No Vernos Ad on Your Portfolio
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
                      colorScheme="secondary"
                    >
                      Get Started
                    </Button>
                  )}
                  {user && (
                    <Button
                      onClick={() => {
                        router.push(`/`);
                      }}
                      colorScheme="secondary"
                    >
                      Continue
                    </Button>
                  )}
                </Stack>
              </ProductCard>
              <ProductCard>
                <Stack spacing={4}>
                  <Heading lineHeight=".9em" size="lg" color="secondary.500">
                    Premium
                  </Heading>
                  <HStack align="center">
                    <Heading lineHeight=".9em" size="xl">
                      $10
                    </Heading>
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
                        Publishing
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text as="span" fontSize="sm">
                        Basic Templates
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
                        Premium Templates
                      </Text>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text as="span" fontSize="sm">
                        No Vernos Ad on Your Portfolio
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
                      colorScheme="secondary"
                    >
                      Get Started
                    </Button>
                  )}
                  {user && (
                    <>
                      {user.subscription?.status === "active" && (
                        <Button
                          onClick={handleManageSubscriptionClick}
                          colorScheme="secondary"
                        >
                          Manage Subscription
                        </Button>
                      )}
                      {user.subscription?.status !== "active" && (
                        <Button
                          onClick={handleUpgradeClick}
                          colorScheme="secondary"
                        >
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
      </Box>
    </Flex>
  );
};

export default Pricing;
