import { Router } from "express";
import {
  createSpec,
  getAllSpecs,
  getSpecById,
  updateSpec,
  deleteSpec,
} from "../vehicleSpecifications/vehicleSpecifications.controller";

const vehiclespecificationsRouter = Router();
vehiclespecificationsRouter.post("/", createSpec);
vehiclespecificationsRouter.get("/", getAllSpecs);
vehiclespecificationsRouter.get("/:id", getSpecById);
vehiclespecificationsRouter.put("/:id", updateSpec);
vehiclespecificationsRouter.delete("/:id", deleteSpec);

export default vehiclespecificationsRouter;
