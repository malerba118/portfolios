import Stripe from "stripe";

let stripe;
const getStripe = () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // https://github.com/stripe/stripe-node#configuration
      apiVersion: "2020-03-02",
    });
  }
  return stripe;
};

export default getStripe;
