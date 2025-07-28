import db from "./db";
import {
  users,
  vehicleSpecifications,
  vehicles,
  locations,
  bookings,
  payments,
  supportTickets,
} from "./schema";
import { hash } from "bcryptjs";

async function seed() {
  console.log("🚀 Starting seeding process...");

  try {
    // Hash password for users
    const passwordHash = await hash("password123", 10);

    // 1. USERS
    const [adminUser, normalUser] = await db
      .insert(users)
      .values([
        {
          firstname: "Admin",
          lastname: "User",
          email: "admin@example.com",
          password: passwordHash,
          role: "admin",
          contact_phone: "0712345678",
          address: "Nairobi",
        },
        {
          firstname: "John",
          lastname: "Doe",
          email: "john@example.com",
          password: passwordHash,
          role: "user",
          contact_phone: "0799999999",
          address: "Kisumu",
        },
      ])
      .returning();

    // 2. LOCATIONS
    const [nairobi, kisumu] = await db
      .insert(locations)
      .values([
        {
          name: "Nairobi CBD Branch",
          address: "Moi Avenue, Nairobi",
          contact_phone: "0700000001",
        },
        {
          name: "Kisumu Branch",
          address: "Oginga Odinga Street",
          contact_phone: "0700000002",
        },
      ])
      .returning();

    // 3. VEHICLE SPECIFICATIONS
    const [spec1, spec2] = await db
      .insert(vehicleSpecifications)
      .values([
        {
          manufacturer: "Toyota",
          model: "Axio",
          year: 2020,
          fuel_type: "Petrol",
          engine_capacity: "1500cc",
          transmission: "Automatic",
          seating_capacity: 5,
          color: "Silver",
          features: "AC, Airbags, Bluetooth",
        },
        {
          manufacturer: "Honda",
          model: "CBR500R",
          year: 2021,
          fuel_type: "Petrol",
          engine_capacity: "500cc",
          transmission: "Manual",
          seating_capacity: 2,
          color: "Red",
          features: "ABS, LED lights",
        },
      ])
      .returning();

    // 4. VEHICLES
    const [vehicle1, vehicle2] = await db
      .insert(vehicles)
      .values([
        {
          vehicleSpec_id: spec1.vehicleSpec_id,
          rental_rate: "3500.00",
          availability: true,
          location_id: nairobi.location_id,
        },
        {
          vehicleSpec_id: spec2.vehicleSpec_id,
          rental_rate: "1500.00",
          availability: true,
          location_id: kisumu.location_id,
        },
      ])
      .returning();

    // 5. BOOKINGS (one by normal user)
    const [booking1] = await db
      .insert(bookings)
      .values([
        {
            user_id: normalUser.user_id,
            vehicle_id: vehicle1.vehicle_id,
            location_id: nairobi.location_id,
            booking_date: "2025-07-01",
            return_date: "2025-07-03",
            total_amount: "7000.00",
            booking_status: "Confirmed",
            },
      ])
      .returning();

    // 6. PAYMENTS
    await db.insert(payments).values([
      {
        booking_id: booking1.booking_id,
        amount: "7000.00",
        payment_status: "Paid",
        payment_date: "2025-07-03",
        payment_method: "Mpesa",
        transaction_id: "MPESA123456",
      },
    ]);

    // 7. SUPPORT TICKETS
    await db.insert(supportTickets).values([
      {
        user_id: normalUser.user_id,
        subject: "Delay in vehicle pickup",
        description: "The vehicle wasn't ready when I arrived.",
        status: "Open",
      },
    ]);

    console.log("✅ Seeding complete.");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    console.log("✅ Seeding complete.");
  }
}

seed();
