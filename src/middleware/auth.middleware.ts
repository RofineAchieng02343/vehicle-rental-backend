import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ✅ Custom Request Type with `user` added
export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

// ✅ Basic Token Verifier (no role check)
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Access denied. No token provided." });
     return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (err) {
   res.status(401).json({ message: "Invalid or expired token" });
   return;
  }
};

// ✅ Combined: Token + Admin only
export const verifyAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;

    if (req.user?.role !== "admin") {
       res.status(403).json({ message: "Admin access required" });
       return;
    }

    next();
  } catch (err) {
   res.status(401).json({ message: "Invalid or expired token" });
   return;
  }
};

// ✅ Combined: Token + User only
export const verifyUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Access denied. No token provided." });
     return
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;

    if (req.user?.role !== "user") {
       res.status(403).json({ message: "User access only" });
       return
    }

    next();
  } catch (err) {
     res.status(401).json({ message: "Invalid or expired token" });
     return
  }
};

// ✅ Combined: Token + Admin or User
export const verifyAdminOrUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Access denied. No token provided." });
     return
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;

    if (req.user?.role === "admin" || req.user?.role === "user") {
      next();
    } else {
       res.status(403).json({ message: "Admin or User access required" });
    }
  } catch (err) {
     res.status(401).json({ message: "Invalid or expired token" });
     return
  }
};
