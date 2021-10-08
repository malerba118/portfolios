import Link from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import User from "./User";
import { useAuth } from "client/useAuth";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import { useFullscreen } from "./Fullscreen";
import { MotionFlex, transitions } from "./animation";
import { useRouter } from "next/router";

const Toolbar = () => {
  const router = useRouter();
  const user = useAuth();
  const { fullscreen } = useFullscreen();

  return (
    <MotionFlex
      px={4}
      h={"56px"}
      animate={{
        marginTop: fullscreen ? "-56px" : 0,
        transition: transitions.one(0.3),
      }}
      alignItems="center"
      overflow="hidden"
      {...styles.borders({ bottom: true })}
    >
      <Heading size="sm">
        <Link href="/">
          <Image cursor="pointer" src="/vernos-4.svg" w={"68px"} />
        </Link>
      </Heading>
      <Box flex={1} />
      <HStack>
        {user && (
          <Menu>
            <MenuButton>
              <User user={user} />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Pricing
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await firebaseClient.auth().signOut();
                  window.location.href = "/";
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </MotionFlex>
  );
};

export default Toolbar;
