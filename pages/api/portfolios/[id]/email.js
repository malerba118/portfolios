import Database from "server/services/database";
import router from "server/utils/router";
import { token } from "shared/utils/token";
import { sendEmail } from "server/services/email";
import { getHostingUrl } from "shared/utils/url";

export default router(
  {
    post: async (req) => {
      const db = await Database({ token: null });
      const portfolio = await db.portfolios.getById(req.query.id);
      let to;
      let url = portfolio.subdomain
        ? getHostingUrl({ subdomain: portfolio.subdomain })
        : "Unavailable (Portfolio not yet published)";
      if (req.body.useDraft) {
        to = portfolio?.draft?.content?.contact?.email?.value;
      } else {
        to = portfolio?.published?.content?.contact?.email?.value;
      }
      if (!to) {
        const user = await db.users.getById(portfolio.owner);
        to = user.email;
      }
      return sendEmail({
        to,
        from: "support@vernos.app", // Change to your verified sender,
        replyTo: "support+no-reply@vernos.app",
        templateId: "d-754a495c33c04577843ca7c2d3c4c945",
        data: {
          portfolio_url: url,
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
        },
      });
    },
  },
  {
    corsOrigin: "*",
  }
);
