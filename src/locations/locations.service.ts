import db from "../drizzle/db";
import { locations } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// ✅ Create a new location
export async function createLocation(data: {
  name: string;
  address: string;
  contact_phone: string;
}) {
  const [newLocation] = await db
    .insert(locations)
    .values({
      name: data.name,
      address: data.address,
      contact_phone: data.contact_phone,
    })
    .returning();

  return newLocation;
}

// ✅ Get all locations
export async function getAllLocations() {
  return await db.query.locations.findMany({
    with:{
      bookings: true,
      vehicles: true
    }
  });
}

// ✅ Get one location by ID
export async function getLocationById(id: number) {
  const location = await db.query.locations.findFirst({
    where: eq(locations.location_id,id),
    with: {
      bookings: true,
      vehicles: true
    }
  });
   

  return location;
}

// ✅ Update location
export async function updateLocation(
  id: number,
  data: Partial<{
    name: string;
    address: string;
    contact_phone: string;
  }>
) {
  const [updated] = await db
    .update(locations)
    .set({ ...data, updated_at: new Date() })
    .where(eq(locations.location_id, id))
    .returning();

  if (!updated) {
    throw new Error("Failed to update. Location not found.");
  }

  return updated;
}

// ✅ Delete location
export async function deleteLocation(id: number) {
  const [deleted] = await db
    .delete(locations)
    .where(eq(locations.location_id, id))
    .returning();

  if (!deleted) {
    throw new Error("Failed to delete. Location not found.");
  }

  return deleted;
}
