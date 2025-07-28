import { Router } from "express";
import {
  handleCreateVehicle,
  handleGetAllVehicles,
  handleGetVehicleById,
  handleUpdateVehicle,
  handleDeleteVehicle,
} from "../vehicles/vehicles.controller"; 

const vehiclesRouter = Router();
 vehiclesRouter.post("/", handleCreateVehicle);
 vehiclesRouter.get("/", handleGetAllVehicles);
 vehiclesRouter.get("/:id", handleGetVehicleById);
 vehiclesRouter.put("/:id", handleUpdateVehicle);
 vehiclesRouter.delete("/:id", handleDeleteVehicle);

export default  vehiclesRouter;
