import { Router } from "express";
import { registerUserController, loginUserController } from "../auth/auth.controller";

const authRouter = Router();


authRouter.post("/register", registerUserController);


authRouter.post("/login", loginUserController );

export default authRouter;
