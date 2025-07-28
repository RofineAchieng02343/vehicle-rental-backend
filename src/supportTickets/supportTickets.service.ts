// src/support/support.service.ts
import db from "../drizzle/db";
import { supportTickets, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// ✅ Create a new support ticket
export const createTicket = async ({
  user_id,
  subject,
  description,
}: {
  user_id: number;
  subject: string;
  description: string;
}) => {
  const [ticket] = await db
    .insert(supportTickets)
    .values({
      user_id,
      subject,
      description,
      status: "Open",
    })
    .returning();

  return ticket;
};

// ✅ Get all tickets with user info (admin view)
export const getAllTickets = async () => {
  const tickets = await db
    .select({
      ticket_id: supportTickets.ticket_id,
      subject: supportTickets.subject,
      description: supportTickets.description,
      status: supportTickets.status,
      created_at: supportTickets.created_at,
      updated_at: supportTickets.updated_at,
      user: {
        user_id: users.user_id,
        firstname: users.firstname,
        lastname: users.lastname,
        email: users.email,
      },
    })
    .from(supportTickets)
    .leftJoin(users, eq(supportTickets.user_id, users.user_id));

  return tickets;
};

// ✅ Get a single ticket by ID
export const getTicketById = async (ticket_id: number) => {
  const [ticket] = await db
    .select({
      ticket_id: supportTickets.ticket_id,
      subject: supportTickets.subject,
      description: supportTickets.description,
      status: supportTickets.status,
      created_at: supportTickets.created_at,
      updated_at: supportTickets.updated_at,
      user: {
        user_id: users.user_id,
        firstname: users.firstname,
        lastname: users.lastname,
        email: users.email,
      },
    })
    .from(supportTickets)
    .leftJoin(users, eq(supportTickets.user_id, users.user_id))
    .where(eq(supportTickets.ticket_id, ticket_id));

  return ticket;
};

// ✅ Update ticket status
export const updateTicketStatus = async ({
  ticket_id,
  status,
}: {
  ticket_id: number;
  status: string;
}) => {
  const [updated] = await db
    .update(supportTickets)
    .set({
      status,
      updated_at: new Date(),
    })
    .where(eq(supportTickets.ticket_id, ticket_id))
    .returning();

  return updated;
};

// ✅ Delete a support ticket
export const deleteTicket = async (ticket_id: number) => {
  const [deleted] = await db
    .delete(supportTickets)
    .where(eq(supportTickets.ticket_id, ticket_id))
    .returning();

  return deleted;
};
