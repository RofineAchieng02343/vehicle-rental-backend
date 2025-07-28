import { Router } from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} from "../locations/locations.controller";

const locationsRouter = Router();
locationsRouter.post("/", createLocation);
locationsRouter.get("/", getAllLocations);
locationsRouter.get("/:id", getLocationById);
locationsRouter.put("/:id", updateLocation);
locationsRouter.delete("/:id", deleteLocation);

export default locationsRouter;
