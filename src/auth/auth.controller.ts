import { Request, Response } from "express";
import { registerUserService, loginUserService } from "./auth.service";
import { registerUserSchema, loginUserSchema } from "../validation/usersValidator";
import jwt from "jsonwebtoken";

// ✅ Register Controller
export const registerUserController = async (req: Request, res: Response) => {
  const result = registerUserSchema.safeParse(req.body);
  if (!result.success) {
     res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const newUser = await registerUserService(result.data);

    res.status(201).json({
      message: `User registered successfully as ${newUser.role === "admin" ? "Admin" : "Member"}`,
      user: {
        user_id: newUser.user_id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

// ✅ Login Controller
export const loginUserController = async (req: Request, res: Response) => {
  const result = loginUserSchema.safeParse(req.body);
  if (!result.success) {
   res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, password } = result.data;

  try {
    const { user } = await loginUserService(email, password);
    const payload ={
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (60*60)
    }
    let secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);

    res.status(200).json({
      message: `Login successful as ${user.role === "admin" ? "Admin" : "Member"}`,
      user: {
        user_id: user.user_id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(401).json({
      message: error.message || "Invalid email or password",
    });
  }
};
