import { Avatar, HStack, Text } from "@chakra-ui/react";

const User = ({ user, size = "sm", showName = false }) => {
  return (
    <HStack alignItems="center">
      <Avatar
        size={size}
        name={user.displayName}
        src={user.photoURL}
        bg="secondary.500"
      />
      {showName && <Text>{user.displayName}</Text>}
    </HStack>
  );
};

export default User;
