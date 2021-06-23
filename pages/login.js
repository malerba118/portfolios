import React from "react";
import Link from "next/link";
import firebaseClient from "client/firebase";
import { useRouter } from "next/router";
import { Button, Center } from "@chakra-ui/react";

// import { Button } from "@chakra-ui/react";

const provider = new firebaseClient.auth.GoogleAuthProvider();

export default (_props) => {
  const router = useRouter();

  return (
    <Center h="100vh" w="100%">
      <Button
        onClick={async () => {
          await firebaseClient.auth().signInWithPopup(provider);
          if (router.query.from) {
            window.location.href = router.query.from;
          } else {
            window.location.href = "/";
          }
        }}
      >
        Log in with Google
      </Button>
    </Center>
  );
};
