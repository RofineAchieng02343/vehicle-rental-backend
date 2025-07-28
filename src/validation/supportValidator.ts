// src/validation/supportValidator.ts
import { z } from "zod";

// ✅ Create ticket schema
export const createTicketSchema = z.object({
  user_id: z.number().int().positive(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// ✅ Update ticket status schema
export const updateTicketSchema = z.object({
  status: z.enum(["Open", "Pending", "Closed"], {
    errorMap: () => ({ message: "Status must be Open, Pending, or Closed" }),
  }),
});
