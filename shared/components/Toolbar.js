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

const Toolbar = () => {
  const user = useAuth();

  console.log(user);
  return (
    <Flex
      px={4}
      h="56px"
      alignItems="center"
      {...styles.borders({ bottom: true })}
    >
      <Heading size="sm">Folios</Heading>
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
    </Flex>
  );
};

export default Toolbar;
