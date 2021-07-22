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
  Button,
} from "@chakra-ui/react";
import User from "./User";
import { useAuth } from "client/useAuth";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import { useFullscreen } from "./Fullscreen";
import { MotionFlex, transitions } from "./animation";

const Toolbar = () => {
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
      <Heading size="sm">Vernos</Heading>
      <Box flex={1} />
      {user && (
        <Menu>
          <MenuButton>
            <User user={user} />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem
              onClick={async () => {
                await firebaseClient.auth().signOut();
                window.location.href = "/";
              }}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {!user && <Link href="/login">log in</Link>}
    </MotionFlex>
  );
};

export default Toolbar;
