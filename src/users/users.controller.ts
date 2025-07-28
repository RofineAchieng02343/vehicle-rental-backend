import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "./users.service";

// Create user
export const handleCreateUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created ", user });
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create user", error: error.message });
    return;
  }
};

// Get all users
export const handleGetAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
    return;
  }
};

// Get user by ID
export const handleGetUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await getUserById(id);
    if (!user) {res.status(404).json({ message: "User not found" });
    res.json({ user });
    return;
}

  } catch {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Update user
export const handleUpdateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await updateUser(id, req.body);
    if (!updated) {res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated ", user: updated });
    return;

}
  } catch (err: any) {
    res.status(400).json({ message: "Failed to update user", error: err.message });
  }
};

// Delete user
export const handleDeleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await deleteUser(id);
    if (!deleted) { res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted ❌", user: deleted });
    return;
}
  } catch {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
