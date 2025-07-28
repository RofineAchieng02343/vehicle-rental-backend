// src/support/support.controller.ts
import { Request, Response } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
} from "./supportTickets.service";
import {
  createTicketSchema,
  updateTicketSchema,
} from "../validation/supportValidator";

// ✅ Create a support ticket
export const createSupportTicket = async (req: Request, res: Response) => {
  const result = createTicketSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const ticket = await createTicket(result.data);
    res.status(201).json({
      message: "Support ticket created successfully",
      ticket,
    });
    return ;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// ✅ Get all support tickets
export const getAllSupportTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
    return;
  } catch (error: any) {
   res.status(500).json({ message: error.message });
   return;
  }
};

// ✅ Get a single ticket by ID
export const getSupportTicketById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ticket ID" });
    return;
  }

  try {
    const ticket = await getTicketById(id);

    if (!ticket) {
       res.status(404).json({ message: "Ticket not found" });
       return;
    }

     res.status(200).json(ticket);
     return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};

// ✅ Update ticket status
export const updateSupportTicketStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ticket ID" });
    return;
  }

  const result = updateTicketSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
    return ;
  }

  try {
    const updated = await updateTicketStatus({ ticket_id: id, status: result.data.status });

    if (!updated) {
     res.status(404).json({ message: "Ticket not found or not updated" });
     return ;
    }

   res.status(200).json({
      message: "Ticket status updated successfully",
      ticket: updated,
    });
    return ;
  } catch (error: any) {
     res.status(500).json({ message: error.message });
     return ;
  }
};

// ✅ Delete a support ticket
export const deleteSupportTicket = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
     res.status(400).json({ message: "Invalid ticket ID" });
     return;
  }

  try {
    const deleted = await deleteTicket(id);

    if (!deleted) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

     res.status(200).json({
      message: "Support ticket deleted successfully",
      ticket: deleted,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
};
