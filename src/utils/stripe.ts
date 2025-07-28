// src/utils/stripe.ts
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY not found in .env");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-06-30.basil",
});

export default stripe;
