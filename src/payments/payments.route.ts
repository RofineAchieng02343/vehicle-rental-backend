// src/payments/payments.route.ts

import { Router } from "express";
import {
  handleCreateCheckoutSession,
  handleSavePayment,
  handleGetAllPayments,
  handleGetPaymentById,
  handleUpdatePaymentStatus,
} from "./payments.controller";

const paymentsRouter = Router();

// Stripe checkout session
paymentsRouter.post("/create-checkout-session", handleCreateCheckoutSession);

// Save payment record to DB after checkout
paymentsRouter.post("/", handleSavePayment);

// Get all payment records
paymentsRouter.get("/", handleGetAllPayments);

// Get a single payment record by ID
paymentsRouter.get("/:id", handleGetPaymentById);

// Update payment status (e.g., success or failed)
paymentsRouter.put("/:id", handleUpdatePaymentStatus);

export default paymentsRouter;
