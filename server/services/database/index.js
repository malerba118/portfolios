// import blendService from './blends'
import authService from "./auth";
import portfolioService from "./portfolios";
import subscriptionService from "./subscriptions";
import meService from "./me";
import userService from "./users";
import { verifyToken } from "./verify";
import { getOrCreateUser } from "./users";

const Database = async ({ token } = {}) => {
  let user = null;
  if (token !== null) {
    var decodedToken = await verifyToken(token);
    user = await getOrCreateUser(decodedToken);
  }
  if (token === null) {
    user = {
      roles: ["superadmin"],
    };
  }

  let db = { user };
  db.auth = authService({ db, user });
  db.users = userService({ db, user });
  db.portfolios = portfolioService({ db, user });
  db.subscriptions = subscriptionService({ db, user });
  db.me = meService({ db, user });
  return db;
};

export default Database;
