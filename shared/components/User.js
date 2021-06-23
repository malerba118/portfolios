import { Avatar, HStack, Text } from "@chakra-ui/react";

const User = ({ user, showName = false }) => {
  console.log(user);
  return (
    <HStack alignItems="center">
      <Avatar size="sm" name={user.displayName} src={user.photoURL} />
      {showName && <Text>{user.displayName}</Text>}
    </HStack>
  );
};

export default User;
