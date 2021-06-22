import Database from "server/services/database";
import router from "server/utils/router";
import { token } from "shared/utils/token";

export default router({
  get: async (req) => {
    const db = await Database({ token: token(req) });
    return db.portfolios.getBySubdomain(req.query.subdomain);
  },
});
