import db from "../drizzle/db";
import { vehicleSpecifications } from "../drizzle/schema";
import { eq } from "drizzle-orm";


export async function createVehicleSpec(data: {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}) {
  const [newSpec] = await db.insert(vehicleSpecifications).values(data).returning();
  return newSpec;
}

export async function getAllVehicleSpecs() {
  return await db.query.vehicleSpecifications.findMany({
    with:{
      vehicles: true
    }
  })
}


export async function getVehicleSpecById(id: number) {
  const spec = await db.query.vehicleSpecifications.findFirst({
    where:eq(vehicleSpecifications.vehicleSpec_id, id),
    with: {

    vehicles: true
    }
  });

  return spec;
}


export async function updateVehicleSpec(id: number, data: Partial<{
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}>) {
  const [updated] = await db
    .update(vehicleSpecifications)
    .set(data)
    .where(eq(vehicleSpecifications.vehicleSpec_id, id))
    .returning();

  return updated;
}


export async function deleteVehicleSpec(id: number) {
  const [deleted] = await db
    .delete(vehicleSpecifications)
    .where(eq(vehicleSpecifications.vehicleSpec_id, id))
    .returning();

  return deleted;
}
