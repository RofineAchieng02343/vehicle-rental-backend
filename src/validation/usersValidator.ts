import { z } from "zod";

// ✅ Register User Schema
export const registerUserSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact_phone: z
    .string()
    .min(7, "Phone must be at least 7 digits")
    .max(15, "Phone must not exceed 15 digits"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["user", "admin"]).optional(),
});

// ✅ Login User Schema
export const loginUserSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

// ✅ Update User Schema (Optional Fields)
export const updateUserSchema = registerUserSchema.partial();
