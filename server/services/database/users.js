import admin from "./firebase";
import { now } from "./utils";

const firestore = admin.firestore();

export const getOrCreateUser = async (decodedToken) => {
  let userDoc = await firestore.collection("users").doc(decodedToken.uid).get();
  if (!userDoc.exists) {
    await firestore
      .collection("users")
      .doc(decodedToken.uid)
      .set({
        id: decodedToken.uid,
        email: decodedToken.email,
        roles: decodedToken.roles || ["user"],
        createdAt: now(),
      });
    userDoc = await firestore.collection("users").doc(decodedToken.uid).get();
  }
  return userDoc.data();
};
