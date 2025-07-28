import { z } from "zod";

// ✅ Create Vehicle Schema
export const createVehicleSchema = z.object({
  vehicleSpec_id: z.number().int(),
  rental_rate: z.string(),
  location_id: z.number().int(),
  availability: z.boolean().optional(),
  vehicle_image_url: z.string()
});

// ✅ Update Vehicle Schema
export const updateVehicleSchema = z.object({
  vehicleSpec_id: z.number().int().optional(),
  rental_rate: z.number().positive().optional(),
  location_id: z.number().int().optional(),
  availability: z.boolean().optional(),
});

