import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
  assertResourceExists,
  assertValid,
} from "./utils";
import { nanoid } from "nanoid";
import { ResourceNotFoundError, UnauthorizedError } from "./errors";
import joi from "joi";

const schemas = {};

const firestore = admin.firestore();

export default ({ db, user }) => {
  const usersCol = firestore.collection("users");

  const updateSubscription = async (customerId, subscription) => {
    if (!db.auth.isSuperAdmin()) {
      throw new UnauthorizedError();
    }
    let userSnapshot = await usersCol
      .where("stripeCustomerId", "==", customerId)
      .get();
    const userDoc = userSnapshot.docs[0];
    await userDoc.ref.update({ subscription });
  };

  return {
    updateSubscription,
  };
};
