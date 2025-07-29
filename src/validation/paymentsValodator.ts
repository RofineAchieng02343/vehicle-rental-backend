// src/validation/paymentsValidator.ts

import { z } from "zod";

// For creating Stripe checkout session
export const createCheckoutSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Amount must be greater than 0" }),
});

// For saving payment to your database
export const savePaymentSchema = z.object({
  user_id: z.number({ required_error: "User ID is required" }),
  booking_id: z.number({ required_error: "Booking ID is required" }),
  payment_date: z
    .string({ required_error: "Payment date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use YYYY-MM-DD format" }),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Amount must be greater than 0" }),
  payment_method: z.string().min(2, "Payment method is required"),
  payment_status: z.string().default("Pending"),
  
});
