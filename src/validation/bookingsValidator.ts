import { z } from "zod";

// ✅ Create Booking Schema
export const createBookingSchema = z.object({
  user_id: z.number().int(),
  vehicle_id: z.number().int(),
  location_id: z.number().int(),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  return_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  total_amount: z.string(),
  booking_status: z.string().optional(),
});

// ✅ Update Booking Schema
export const updateBookingSchema = z.object({
  user_id: z.number().int().optional(),
  vehicle_id: z.number().int().optional(),
  location_id: z.number().int().optional(),
  booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  return_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  total_amount: z.string().optional(),
  booking_status: z.string().optional(),
});

