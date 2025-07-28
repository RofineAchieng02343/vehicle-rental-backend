import { Router } from "express";
import {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser
} from "../users/users.controller"; 

const usersRouter = Router();

usersRouter.post("/", handleCreateUser);
usersRouter.get("/", handleGetAllUsers);
usersRouter.get("/:id", handleGetUserById);
usersRouter.put("/:id", handleUpdateUser);
usersRouter.delete("/:id", handleDeleteUser);

export default usersRouter;
