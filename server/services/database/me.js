import admin from "./firebase";
import {
  toData,
  assertAuthenticated,
  assertResourceExists,
  assertValid,
} from "./utils";
import { ResourceNotFoundError, UnauthorizedError } from "./errors";
import joi from "joi";

const schemas = {};

const firestore = admin.firestore();

export default ({ db, user }) => {
  const usersCol = firestore.collection("users");

  const updateCustomer = async (customerId) => {
    assertAuthenticated(user);
    await usersCol.doc(user.id).update({
      stripeCustomerId: customerId,
    });
    const userDoc = await usersCol.doc(user.id).get();
    return toData(userDoc);
  };

  return {
    updateCustomer,
  };
};
