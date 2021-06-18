import admin from "./firebase";
import {
  now,
  toList,
  toData,
  assertAuthenticated,
  assertValid,
  toDisplayUser,
  calcOrderPrice,
} from "./utils";
import * as schemas from "./schemas";

const firestore = admin.firestore();

export default ({ db, user }) => {
  const ordersCol = firestore.collection("orders");

  const create = async ({ items }) => {
    let orderData = { items };
    orderData.user = user ? toDisplayUser(user) : null;
    orderData.createdAt = now();
    orderData.status = "initialized";
    orderData.amount = calcOrderPrice(orderData);
    orderData.checkoutSessionId = null;

    assertValid(orderData, schemas.Order);

    const orderDocRef = await ordersCol.add(orderData);
    const orderDoc = await orderDocRef.get();
    return toData(orderDoc);
  };

  const list = async ({ own = false } = {}) => {
    assertAuthenticated(user);

    let query = ordersCol;
    if (own) {
      query = query.where("user.id", "==", user?.id);
    }

    return toList(await query.get());
  };

  const get = async (id) => {
    const orderDoc = await ordersCol.doc(id).get();
    if (!orderDoc.exists) {
      throw new Error("Order does not exist");
    }
    return toData(orderDoc);
  };

  return {
    create,
    list,
    get,
  };
};
