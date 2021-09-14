import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Toolbar } from "shared/components/unauthed";
import { getCommonSsrProps } from "server/utils/ssr";
import { useAuth } from "client/useAuth";

export const getServerSideProps = async (ctx) => {
  let config = {};
  config.props = await getCommonSsrProps(ctx);
  return config;
};

const SubscriptionSuccess = (props) => {
  const user = useAuth();
  const router = useRouter();
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
        <Button
          onClick={() => {
            router.push("/");
          }}
          m={8}
          colorScheme="purple"
        >
          Go to Editor
        </Button>
      </Center>
    </Flex>
  );
};

export default SubscriptionSuccess;
