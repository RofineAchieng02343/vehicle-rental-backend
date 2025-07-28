// src/payments/payments.controller.ts

import { Request, Response } from "express";
import {
  createCheckoutSession,
  savePayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus
} from "./payments.service"; // ✅ use functions, not PaymentService class

import { createCheckoutSchema, savePaymentSchema } from "../validation/paymentsValodator";

// ✅ Create Stripe Checkout Session
export const handleCreateCheckoutSession = async (req: Request, res: Response) => {
  const result = createCheckoutSchema.safeParse(req.body);

  if (!result.success) {
     res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, amount } = result.data;

  try {
    const sessionUrl = await createCheckoutSession(email, amount);

    if (!sessionUrl) {
       res.status(500).json({ error: "Failed to create Stripe session" });
       return;
    }

    res.status(200).json({ url: sessionUrl });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong while creating checkout session",
      details: (error as Error).message,
    });
  }
};

// ✅ Save payment record
export const handleSavePayment = async (req: Request, res: Response) => {
  const result = savePaymentSchema.safeParse(req.body);

  if (!result.success) {
     res.status(400).json({
      message: "Validation error",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const payment = await savePayment(result.data);
    res.status(201).json({
      message: "Payment saved successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving payment",
      error: (error as Error).message,
    });
  }
};

// ✅ Get all payments
export const handleGetAllPayments = async (_req: Request, res: Response) => {
  try {
    const all = await getAllPayments();
    res.status(200).json({ payments: all });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payments",
      error: (error as Error).message,
    });
  }
};

// ✅ Get payment by ID
export const handleGetPaymentById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
     res.status(400).json({ message: "Invalid payment ID" });
     return;
  }

  try {
    const payment = await getPaymentById(id);
    if (!payment) {
       res.status(404).json({ message: "Payment not found" });
       return;
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving payment",
      error: (error as Error).message,
    });
  }
};

// ✅ Update payment status
export const handleUpdatePaymentStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (isNaN(id) || !status) {
     res.status(400).json({ message: "Invalid ID or status" });
     return;
  }

  try {
    const updated = await updatePaymentStatus(id, status);
    res.status(200).json({
      message: "Payment status updated",
      payment: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating payment status",
      error: (error as Error).message,
    });
  }
};
