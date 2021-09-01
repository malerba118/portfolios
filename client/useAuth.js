import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "./firebase";

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ user, children }) {
  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        nookies.destroy(null, "token");
      } else {
        const token = await firebaseUser.getIdToken();
        nookies.set(null, "token", token, {});
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
