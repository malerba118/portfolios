import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebase";

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ user, children }) {
  useEffect(() => {
    // probably unneccesary to track prev but leaving for now (the problem was firebase client was configured to use session storage for auth instead of local storage)
    let prevToken = nookies.get(null).token;
    let prevUid = nookies.get(null).uid;
    return firebaseClient.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        nookies.destroy(null, "token");
        nookies.destroy(null, "uid");
      } else {
        const token = await firebaseUser.getIdToken();
        nookies.set(null, "token", token, {});
        nookies.set(null, "uid", firebaseUser.uid, {});
      }
      const currToken = nookies.get(null).token;
      const currUid = nookies.get(null).uid;
      if (Boolean(prevToken) !== Boolean(currToken)) {
        window.location.reload();
      }
      prevToken = currToken;
      prevUid = currUid;
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 60 * 10 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
