import React from "react";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "client/useAuth";
import * as api from "client/api";

const Editor = () => {
  const user = useAuth();
  const query = useQuery("portfolio", api.portfolio.get);

  return (
    <Box>
      <h2>Hello, {user?.email}</h2>
      <p>{JSON.stringify(query.data)}</p>
    </Box>
  );
};

export default Editor;
