import db from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { userInsert, userSelect } from "../drizzle/schema";

// Create user
export const createUser = async (user: userInsert): Promise<userSelect> => {
  const [newUser] = await db.insert(users).values(user).returning();
  return newUser;
};

// Get all users
export const getAllUsers = async (): Promise<userSelect[]> => {
  return await db.select().from(users);
};

// Get user by ID
export const getUserById = async (id: number): Promise<userSelect | undefined> => {
  const [user] = await db.select().from(users).where(eq(users.user_id, id));
  return user;
};

// Update user
export const updateUser = async (
  id: number,
  data: Partial<userInsert>
): Promise<userSelect | null> => {
  const [updated] = await db.update(users).set({ ...data, updated_at: new Date() })
    .where(eq(users.user_id, id))
    .returning();

  return updated ?? null;
};

// Delete user
export const deleteUser = async (id: number): Promise<userSelect | null> => {
  const [deleted] = await db.delete(users).where(eq(users.user_id, id)).returning();
  return deleted ?? null;
};
