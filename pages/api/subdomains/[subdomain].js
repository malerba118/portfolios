import Database from "server/services/database";
import router from "server/utils/router";
import { isValidSubdomain } from "shared/utils/data";
import { token } from "shared/utils/token";

export default router({
  get: async (req) => {
    const db = await Database({ token: token(req) });
    let body = {};
    if (!isValidSubdomain(req.query.subdomain)) {
      return {
        available: false,
        message: "Contains invalid characters",
      };
    }
    const available = await db.portfolios.isSubdomainAvailable(
      req.query.subdomain
    );
    return {
      available,
      message: available ? undefined : "Already in use by another user",
    };
  },
});
