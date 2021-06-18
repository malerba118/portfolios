// import blendService from './blends'
import authService from "./auth";
import blendService from "./blends";
import ingredientService from "./ingredients";
import orderService from "./orders";
import admin from "./firebase";
import { verifyToken } from "./verify";
import { getOrCreateUser } from "./users";

const firestore = admin.firestore();

const Database = async ({ token } = {}) => {
  let user = null;
  if (token !== null) {
    var decodedToken = await verifyToken(token);
    user = await getOrCreateUser(decodedToken);
  }

  let db = { user };
  db.auth = authService({ db, user });
  db.blends = blendService({ db, user });
  db.ingredients = ingredientService({ db, user });
  db.orders = orderService({ db, user });
  return db;
};

export default Database;
