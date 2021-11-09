import { getAppUrl } from "shared/utils/url";
import Database from "server/services/database";
import router from "server/utils/router";
import { token } from "shared/utils/token";
import getStripe from "server/services/stripe";

const stripe = getStripe();

export default router({
  post: async (req) => {
    const { price, metadata = {} } = req.body;

    const db = await Database({ token: token(req) });
    let user = await db.me.get();
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: {
          firestoreUserId: user.id,
          email: user.email,
        },
      });
      user = await db.me.updateCustomer(customer.id);
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: process.env.PREMIUM_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getAppUrl()}/subscription-success`,
      cancel_url: `${getAppUrl()}/`,
    });

    return { sessionId: session.id };
  },
});

// const createCheckoutSession = async (req, res) => {
//   if (req.method === "POST") {
//     const token = req.headers.token;
//     const { price, quantity = 1, metadata = {} } = req.body;

//     try {
//       const user = await getUser(token);
//       const customer = await createOrRetrieveCustomer({
//         uuid: user.id,
//         email: user.email,
//       });

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         billing_address_collection: "required",
//         customer,
//         line_items: [
//           {
//             price,
//             quantity: 1,
//           },
//         ],
//         mode: "subscription",
//         allow_promotion_codes: true,
//         subscription_data: {
//           trial_from_plan: true,
//           metadata,
//         },
//         success_url: `${getAppUrl()}/subscription-success`,
//         cancel_url: `${getAppUrl()}/`,
//       });

//       return res.status(200).json({ sessionId: session.id });
//     } catch (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ error: { statusCode: 500, message: err.message } });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// };

// export default createCheckoutSession;
