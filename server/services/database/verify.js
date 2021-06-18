import admin from "./firebase";

export const verifyToken = (token) => {
  try {
    return admin.auth().verifyIdToken(token);
  } catch (err) {
    // throw new InvalidTokenError()
    throw new Error("invalid token");
  }
};
