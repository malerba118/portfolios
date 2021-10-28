import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Toolbar } from "shared/components/unauthed";
import { getCommonSsrProps } from "server/utils/ssr";
import { useAuth } from "client/useAuth";
import { textures } from "shared/utils/styles";

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
      minH="var(--app-height)"
      w="100%"
      direction="column"
      bgColor="primary.50"
      {...textures.speckles}
    >
      <Toolbar />
      <Center flex={1} flexDirection="column">
        <Heading maxW="900" color="secondary.500" textAlign="center" size="3xl">
          Congrats, you're ready to make an awesome portfolio!
        </Heading>
        <Button
          onClick={() => {
            router.push("/");
          }}
          m={8}
          colorScheme="secondary"
        >
          Go to Editor
        </Button>
      </Center>
    </Flex>
  );
};

export default SubscriptionSuccess;
