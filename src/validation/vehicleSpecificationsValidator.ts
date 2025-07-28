import { z } from "zod";

export const vehicleSpecSchema = z.object({
  manufacturer: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int()
    .gte(1900)
    .lte(new Date().getFullYear()),
  fuel_type: z.string().min(1),
  engine_capacity: z.string().min(1),
  transmission: z.string().min(1),
  seating_capacity: z
    .number({ invalid_type_error: "Seating capacity must be a number" })
    .int()
    .gte(1),
  color: z.string().min(1),
  features: z.string().min(1),
});
