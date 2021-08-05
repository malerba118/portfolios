import Database from "server/services/database";
import router from "server/utils/router";
import { token } from "shared/utils/token";
import { sendEmail } from "server/services/email";

export default router({
  post: async (req) => {
    const db = await Database({ token: null });
    const portfolio = await db.portfolios.getBySubdomain(req.query.subdomain);
    return sendEmail({
      to: portfolio?.published?.content?.contact?.email,
      from: "vernosapp@gmail.com", // Change to your verified sender
      subject: "New message via your vernos portfolio",
      text: `Someone contacted you through your vernos portfolio! Here's what they said: "${req.body.message}"`,
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    });
  },
});
