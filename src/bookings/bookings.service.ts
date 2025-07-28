import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  bookings,
  users,
  vehicles,
  locations,
  payments,
  bookingsInsert,
  bookingsSelect,
  userSelect,
  vehiclesSelect,
  locationsSelect,
  paymentsSelect
} from "../drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

// ✅ Fixed: Now accepts null too
const formatDate = (d?: string | Date | null): string | undefined =>
  d ? new Date(d).toISOString().split("T")[0] : undefined;

// ✅ Get all bookings with relations
export const getAllBookings = async () => {
  return await db.query.bookings.findMany({
    with: {
      user: true,
      vehicle: true,
      location: true,
      payment: true,
    },
  });
};


export const getBookingById = async (
  bookingId: number
): Promise<bookingsSelect | undefined> => {
  return await db.query.bookings.findFirst({
    where: eq(bookings.booking_id, bookingId),
    with: {
      user: true,
      vehicle: true,
      location: true,
      payment: true,
    },
  });
};


// ✅ Create a booking
export const createBooking = async (
  booking: bookingsInsert
): Promise<string> => {
  await db.insert(bookings).values({
    ...booking,
    booking_date: formatDate(booking.booking_date),
    return_date: formatDate(booking.return_date)
  });
  return "Booking created successfully 🚗";
};

// ✅ Update a booking
export const updateBooking = async (
  bookingId: number,
  data: Partial<bookingsInsert>
): Promise<string> => {
  const updateData = {
    ...data,
    booking_date: formatDate(data.booking_date ?? undefined),
    return_date: formatDate(data.return_date ?? undefined),
    updated_at: new Date()
  };

  await db.update(bookings).set(updateData).where(eq(bookings.booking_id, bookingId));
  return "Booking updated successfully 📅✏️";
};

// ✅ Delete a booking
export const deleteBooking = async (
  bookingId: number
): Promise<string> => {
  await db.delete(bookings).where(eq(bookings.booking_id, bookingId));
  return "Booking deleted successfully ❌🚗";
};
