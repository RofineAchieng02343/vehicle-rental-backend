import db from "../drizzle/db";
import { vehicles, vehiclesInsert } from "../drizzle/schema";
import { eq } from "drizzle-orm";


const now = () => new Date();

export const createVehicle = async (data: vehiclesInsert) => {
  const [newVehicle] = await db
    .insert(vehicles)
    .values({
      vehicleSpec_id: data.vehicleSpec_id,
      rental_rate: data.rental_rate, // ✅ Decimal accepted as number
      location_id: data.location_id,
      availability: data.availability ?? true,
      vehicle_image_url: data.vehicle_image_url, // ✅ Correct key
    })
    .returning();

  return newVehicle;
};




export const getAllVehicles = async () => {
  return await db.query.vehicles.findMany({
  with: {
    specification: true,
    location: true
  }
})

};


export const getVehicleById = async (id: number) => {
  const vehicle = await db.query.vehicles.findFirst({
    where: eq(vehicles.vehicle_id, id),
    with: {
      specification: true,
      location: true,
    }
  })

  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
};


export const updateVehicle = async (
  id: number,
  data: Partial<{
    vehicleSpec_id: number;
    rental_rate: number;
    availability: boolean;
    location_id: number;
  }>
) => {
  const [updated] = await db
    .update(vehicles)
    .set({
      ...data,
      rental_rate: data.rental_rate?.toString(), 
      updated_at: new Date(),
    })
    
    .where(eq(vehicles.vehicle_id, id))
    .returning();

  if (!updated) throw new Error("Failed to update. Vehicle not found.");
  return updated;
};


export const deleteVehicle = async (id: number) => {
  const [deleted] = await db
    .delete(vehicles)
    .where(eq(vehicles.vehicle_id, id))
    .returning();

  if (!deleted) throw new Error("Failed to delete. Vehicle not found.");
  return deleted;
};
