import React from "react";
import * as styles from "../utils/styles";
import {
  Heading,
  Box,
  Flex,
  Stack,
  Button,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "client/useAuth";
import User from "./User";
import FormSection from "./FormSection";
import InputContainer from "./InputContainer";
import DateViewer from "./DateViewer";
import * as api from "client/api";
import { useRouter } from "next/router";

const ProfileItem = ({ label, children, action, ...otherProps }) => {
  return (
    <Box
      {...otherProps}
      p={4}
      rounded="md"
      {...styles.borders({ top: true, right: true, bottom: true, left: true })}
    >
      <HStack>
        <Stack flex={1} spacing={2}>
          <Heading fontWeight="900" fontSize="lg">
            {label}
          </Heading>
          <Box fontSize="md">{children}</Box>
        </Stack>
        <Center h="100%">{action}</Center>
      </HStack>
    </Box>
  );
};

const Profile = () => {
  const user = useAuth();
  const router = useRouter();
  return (
    <Flex p={16} justify="center">
      <Box
        maxW="600px"
        w="100%"
        p={6}
        rounded="md"
        {...styles.borders({
          top: true,
          right: true,
          bottom: true,
          left: true,
        })}
      >
        <Stack align="center" spacing={6}>
          <User user={user} size="xl" />
          {user.displayName && <Heading>{user.displayName}</Heading>}
          <ProfileItem label="Display Name" alignSelf="stretch">
            {user.displayName || "No display name"}
          </ProfileItem>
          <ProfileItem label="Email" alignSelf="stretch">
            {user.email}
          </ProfileItem>
          <ProfileItem label="Joined" alignSelf="stretch">
            <DateViewer startDate={user.createdAt} />
          </ProfileItem>
          <ProfileItem
            label="Subscription"
            alignSelf="stretch"
            action={
              <>
                {user?.subscription?.status === "active" && (
                  <Button
                    onClick={() =>
                      api.account.createPortalLink().then(({ url }) => {
                        router.push(url);
                      })
                    }
                  >
                    Manage
                  </Button>
                )}
                {user?.subscription?.status !== "active" && (
                  <Button>Upgrade</Button>
                )}
              </>
            }
          >
            <Flex justify="space-between" align="flex-end">
              <Text>No subscription</Text>
            </Flex>
          </ProfileItem>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Profile;
