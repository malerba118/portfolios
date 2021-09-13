import { getAppUrl } from "shared/utils/url";
import Database from "server/services/database";
import router from "server/utils/router";
import { token } from "shared/utils/token";
import getStripe from "server/services/stripe";

const stripe = getStripe();

export default router({
  post: async (req) => {
    const db = await Database({ token: token(req) });
    const { url } = await stripe.billingPortal.sessions.create({
      customer: db.user.stripeCustomerId,
      return_url: `${getAppUrl()}/profile`,
    });
    return { url };
  },
});
