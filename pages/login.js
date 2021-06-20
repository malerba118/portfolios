import React from "react";
import Link from "next/link";
import firebaseClient from "client/firebase";
import { useRouter } from 'next/router'

// import { Button } from "@chakra-ui/react";

const provider = new firebaseClient.auth.GoogleAuthProvider();

export default (_props) => {
  const router = useRouter()

  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <button
        onClick={async () => {
          await firebaseClient.auth().signInWithPopup(provider)
          if (router.query.from) {
            window.location.href = router.query.from
          }
          else {
            window.location.href = '/'
          }
        }}
      >
        Log in
      </button>
    </div>
  );
};
