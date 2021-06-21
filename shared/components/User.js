import { Avatar, HStack } from "@chakra-ui/react";

const User = ({ user }) => {
  return (
    <HStack alignItems="center">
      <Avatar size="xs" name={user.name} src={user.image} />
      <Text>{user.name}</Text>
    </HStack>
  );
};

export default User;
