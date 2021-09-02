import { Avatar, HStack, Text } from "@chakra-ui/react";

const User = ({ user, showName = false }) => {
  return (
    <HStack alignItems="center">
      <Avatar
        size="sm"
        name={user.displayName}
        src={user.photoURL}
        bg="purple.500"
      />
      {showName && <Text>{user.displayName}</Text>}
    </HStack>
  );
};

export default User;
