import db from "../drizzle/db";
import { userInsert, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ✅ Register new user
export async function registerUserService(userData: userInsert) {
  // Check if user already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email));

  if (existing.length > 0) {
    throw new Error("User with this email already exists.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  // Create user
  const [newUser] = await db
    .insert(users)
    .values(userData)
    .returning();

  // Remove password from response
  const { password, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
}

// ✅ Login user
export async function loginUserService(email: string, password: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0]);

  if (!user) throw new Error("Invalid email or password.");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid email or password.");

  const token = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password: _pw, ...userData } = user;

  return { user: userData, token };
}
