import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
    boolean,
    decimal,
    date,
    pgEnum,
  } from "drizzle-orm/pg-core";
  import { relations } from "drizzle-orm";

  export const roleEnum = pgEnum("role", ["admin", "user"])
 
  
  // USERS TABLE
  
  export const users = pgTable("users", {
    user_id: serial("user_id").primaryKey(),
    firstname: varchar("firstname", { length: 100 }),
    lastname: varchar("lastname", { length: 100 }),
    email: varchar("email", { length: 150 }).notNull().unique(),
    password: text("password").notNull(),
    contact_phone: varchar("contact_phone", { length: 20 }),
    address: text("address"),
    role: roleEnum("role").default("user"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  export const userRelations = relations(users, ({ many }) => ({
    bookings: many(bookings),
    supportTickets: many(supportTickets),
  }));
  
  // VEHICLE SPECIFICATIONS TABLE

  export const vehicleSpecifications = pgTable("vehicle_specifications", {
    vehicleSpec_id: serial("vehicleSpec_id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 100 }),
    model: varchar("model", { length: 100 }),
    year: integer("year"),
    fuel_type: varchar("fuel_type", { length: 50 }),
    engine_capacity: varchar("engine_capacity", { length: 50 }),
    transmission: varchar("transmission", { length: 50 }),
    seating_capacity: integer("seating_capacity"),
    color: varchar("color", { length: 50 }),
    features: text("features"),
  });
  
  export const vehicleSpecRelations = relations(vehicleSpecifications, ({ many }) => ({
    vehicles: many(vehicles),
  }));
  
  // LOCATIONS TABLE
  
  export const locations = pgTable("locations", {
    location_id: serial("location_id").primaryKey(),
    name: varchar("name", { length: 100 }),
    address: text("address"),
    contact_phone: varchar("contact_phone", { length: 20 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  export const locationRelations = relations(locations, ({ many }) => ({
    vehicles: many(vehicles),
    bookings: many(bookings),
  }));
  
  // VEHICLES TABLE
  
  export const vehicles = pgTable("vehicles", {
    vehicle_id: serial("vehicle_id").primaryKey(),
    vehicleSpec_id: integer("vehicleSpec_id").references(() => vehicleSpecifications.vehicleSpec_id),
    vehicle_image_url: text("vehicle_image_url"),
    rental_rate: decimal("rental_rate", { precision: 10, scale: 2 }),
    availability: boolean("availability").default(true),
    location_id: integer("location_id").references(() => locations.location_id),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  

  
  export const vehicleRelations = relations(vehicles, ({ one, many }) => ({
    specification: one(vehicleSpecifications, {
      fields: [vehicles.vehicleSpec_id],
      references: [vehicleSpecifications.vehicleSpec_id],
    }),
    location: one(locations, {
      fields: [vehicles.location_id],
      references: [locations.location_id],
    }),
    bookings: many(bookings),
  }));
  
  // BOOKINGS TABLE
  
  export const bookings = pgTable("bookings", {
    booking_id: serial("booking_id").primaryKey(),
    user_id: integer("user_id").references(() => users.user_id),
    vehicle_id: integer("vehicle_id").references(() => vehicles.vehicle_id),
    location_id: integer("location_id").references(() => locations.location_id),
    booking_date: date("booking_date"),
    return_date: date("return_date"),
    total_amount: decimal("total_amount", { precision: 10, scale: 2 }),
    booking_status: varchar("booking_status", { length: 20 }).default("Pending"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  export const bookingRelations = relations(bookings, ({ one, many }) => ({
    user: one(users, {
      fields: [bookings.user_id],
      references: [users.user_id],
    }),
    vehicle: one(vehicles, {
      fields: [bookings.vehicle_id],
      references: [vehicles.vehicle_id],
    }),
    location: one(locations, {
      fields: [bookings.location_id],
      references: [locations.location_id],
    }),
    payment: many(payments),
  }));
  
  // PAYMENTS TABLE
  
  export const payments = pgTable("payments", {
    payment_id: serial("payment_id").primaryKey(),
    booking_id: integer("booking_id").references(() => bookings.booking_id),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    payment_status: varchar("payment_status", { length: 20 }).default("Pending"),
    payment_date: date("payment_date"),
    payment_method: varchar("payment_method", { length: 50 }),
    transaction_id: varchar("transaction_id", { length: 100 }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  export const paymentRelations = relations(payments, ({ one }) => ({
    booking: one(bookings, {
      fields: [payments.booking_id],
      references: [bookings.booking_id],
    }),
  }));
  
  
  // SUPPORT TICKETS TABLE
  export const supportTickets = pgTable("support_tickets", {
    ticket_id: serial("ticket_id").primaryKey(),
    user_id: integer("user_id").references(() => users.user_id),
    subject: varchar("subject", { length: 150 }),
    description: text("description"),
    status: varchar("status", { length: 20 }).default("Open"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  });
  
  export const supportTicketRelations = relations(supportTickets, ({ one }) => ({
    user: one(users, {
      fields: [supportTickets.user_id],
      references: [users.user_id],
    }),
  }));

//   TYPES
//   USERS
export type userInsert = typeof users.$inferInsert;
export type userSelect = typeof users.$inferSelect;


// VEHICLE SPECIFICATIONS
export type vehicleSpecificationInsert = typeof  vehicleSpecifications.$inferInsert;
export type vehicleSpecificationSelect = typeof vehicleSpecifications.$inferSelect;


// VEHICLES
export type vehiclesInsert = typeof vehicles.$inferInsert;
export type vehiclesSelect = typeof vehicles.$inferSelect;


// LOCATIONS
export type LocationsInsert = typeof locations.$inferInsert;
export type locationsSelect = typeof locations.$inferSelect;


// BOOKINGS
export type bookingsInsert = typeof bookings.$inferInsert;
export type bookingsSelect = typeof bookings.$inferSelect;

// PAYMENTS
export type paymentsInsert = typeof payments.$inferInsert;
export type paymentsSelect = typeof payments.$inferSelect;

// SUPPORT TICKETS
export type supportTicketsInsert = typeof supportTickets.$inferInsert;
export type supportTicketsSelect = typeof supportTickets.$inferSelect;
