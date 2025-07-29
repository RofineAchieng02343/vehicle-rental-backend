import { Router } from "express";
import {
  createBookingHandler,
  getAllBookingsHandler,
  getBookingByIdHandler,
  updateBookingHandler,
  deleteBookingHandler,
} from "../bookings/bookings.controller"; 
import { verifyAdmin, verifyAdminOrUser } from "../middleware/auth.middleware";


const bookingRouter = Router();

// Protected Routes: Require JWT token
bookingRouter.post("/", createBookingHandler);
bookingRouter.get("/",verifyAdmin, getAllBookingsHandler);
bookingRouter.get("/:id", verifyAdminOrUser, getBookingByIdHandler);
bookingRouter.put("/:id", verifyAdminOrUser, updateBookingHandler);
bookingRouter.delete("/:id", verifyAdminOrUser, deleteBookingHandler);

export default bookingRouter;
