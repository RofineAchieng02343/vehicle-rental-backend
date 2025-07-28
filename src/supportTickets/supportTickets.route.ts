// src/support/support.route.ts
import { Router } from "express";
import {
  createSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  updateSupportTicketStatus,
  deleteSupportTicket,
} from "./supportTickets.controller";

import { verifyToken } from "../middleware/auth.middleware"; // or adjust based on your middleware location

const supportRouter = Router();


supportRouter.post("/", verifyToken, createSupportTicket);


supportRouter.get("/", verifyToken, getAllSupportTickets);
supportRouter.get("/:id", verifyToken, getSupportTicketById);
supportRouter.put("/:id", verifyToken, updateSupportTicketStatus);
supportRouter.delete("/:id", verifyToken, deleteSupportTicket);

export default supportRouter;
