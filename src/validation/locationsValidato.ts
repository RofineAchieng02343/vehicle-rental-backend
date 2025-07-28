import { z } from "zod";

// ✅ Schema for creating a location
export const createLocationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  contact_phone: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(20, { message: "Phone number is too long" }),
});

// ✅ Schema for updating a location (all fields optional)
export const updateLocationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contact_phone: z.string().optional(),
});

