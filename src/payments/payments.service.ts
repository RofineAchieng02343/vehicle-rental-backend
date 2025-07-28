// src/payments/payments.service.ts

import Stripe from "stripe";
import db from "../drizzle/db";
import { payments, bookings } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY not found in .env");
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2025-06-30.basil", // ⚠️ make sure this is a valid version or change it to e.g. "2023-10-16"
});

// ✅ Create Stripe Checkout session
export async function createCheckoutSession(email: string, amount: number) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "kes",
            product_data: {
              name: "Vehicle Booking Payment",
            },
            unit_amount: amount * 100, // Stripe uses smallest currency unit
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5000/success",
      cancel_url: "http://localhost:5000/cancel",
    });

    return session.url;
  } catch (err) {
    console.error("Stripe error", err);
    return null;
  }
}

// ✅ Save payment record in DB
export async function savePayment({
  booking_id,
  amount,
  payment_status = "Pending",
  payment_date,
  payment_method,
  transaction_id,
}: {
  booking_id: number;
  amount: number;
  payment_status?: string;
  payment_date: Date;
  payment_method: string;
  transaction_id: string;
}) {
  const [payment] = await db
    .insert(payments)
    .values({
      booking_id,
      amount,
      payment_status,
      payment_date,
      payment_method,
      transaction_id,
    })
    .returning();

  return payment;
}

// ✅ Get all payments
export async function getAllPayments() {
  return await db.select().from(payments);
}

// ✅ Get payment by ID
export async function getPaymentById(id: number) {
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.payment_id, id));

  return payment;
}

// ✅ Update payment status
export async function updatePaymentStatus(id: number, status: string) {
  const [updated] = await db
    .update(payments)
    .set({ payment_status: status })
    .where(eq(payments.payment_id, id))
    .returning();

  return updated;
}
