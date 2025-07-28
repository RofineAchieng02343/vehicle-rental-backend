import { Request, Response } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "./bookings.service";

import {
  createBookingSchema,
  updateBookingSchema,
} from "../validation/bookingsValidator";

// ✅ Create booking
export const createBookingHandler = async (req: Request, res: Response) => {
  try {
    const data = createBookingSchema.parse(req.body);
    const booking = await createBooking(data);
    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Failed to create booking",
      issues: err.errors || undefined,
    });
  }
};

// ✅ Get all bookings
export const getAllBookingsHandler = async (_req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.json({ bookings });
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ Get booking by ID
export const getBookingByIdHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
   res.status(400).json({ message: "Invalid booking ID" });
   return;
  }

  try {
    const booking = await getBookingById(id);
    res.json({ booking });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// ✅ Update booking
export const updateBookingHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid booking ID" });
    return;
  }

  try {
    const data = updateBookingSchema.parse(req.body);
    const updated = await updateBooking(id, data);
    res.json({
      message: "Booking updated successfully",
      booking: updated,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Failed to update booking",
      issues: err.errors || undefined,
    });
  }
};

// ✅ Delete booking
export const deleteBookingHandler = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
   res.status(400).json({ message: "Invalid booking ID" });
   return;
  }

  try {
    const deleted = await deleteBooking(id);
    res.json({
      message: "Booking deleted successfully",
      booking: deleted,
    });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
