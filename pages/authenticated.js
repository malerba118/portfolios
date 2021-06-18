import React from "react";
import nookies from "nookies";
import firebaseClient from "client/firebase";
// import Database from "server/services/database";
import axios from 'axios';

axios.defaults.withCredentials = true

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);

        if (!cookies.token) {
          throw new Error('unauthed')
        }
        // const db = await Database({ token: cookies.token })

        // the user is authenticated!
        // FETCH STUFF HERE
        return {
            props: { message: `Success` },
        };
    }
    catch (err) {
        console.log(err)
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {},
        };
    }
};
const AuthenticatedPage = (props) => (
    <div>
    <p>{props.message}</p>
    <button
      onClick={async () => {
        await firebaseClient.auth().signOut();
        window.location.href = "/";
      }}
    >
      Sign out
    </button>
  </div>
)
export default AuthenticatedPage;
