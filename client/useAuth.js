import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebase";

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ user, children }) {
  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (firebaseUser) => {
      const prevToken = nookies.get(null).token;
      if (!firebaseUser) {
        nookies.destroy(null, "token");
      } else {
        const token = await firebaseUser.getIdToken();
        nookies.set(null, "token", token, {});
      }
      const currToken = nookies.get(null).token;
      if (Boolean(prevToken) !== Boolean(currToken)) {
        // if existence of token changes, reload cause user is either logged in or logged out
        window.location.reload();
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
