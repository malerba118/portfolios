import { UnauthorizedError } from "./errors";
import admin from "./firebase";
import { now } from "./utils";
import { toData } from "./utils";

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
        displayName: decodedToken.name || null,
        photoURL: decodedToken.picture || null,
        roles: decodedToken.roles || ["user"],
        createdAt: now(),
      });
    userDoc = await firestore.collection("users").doc(decodedToken.uid).get();
  }
  return userDoc.data();
};

export default ({ db, user }) => {
  const usersCol = firestore.collection("users");

  const getById = async (id) => {
    if (!db.auth.isSuperAdmin()) {
      throw new UnauthorizedError();
    }
    const userDoc = await usersCol.doc(id).get();
    return toData(userDoc);
  };

  return {
    getById,
  };
};
