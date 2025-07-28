import { Request, Response } from "express";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../vehicles/vehicles.service"; 
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validation/vehiclesValidator";


export const handleCreateVehicle = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const data = createVehicleSchema.parse(req.body);
    const vehicle = await createVehicle(data);
    res.status(201).json({
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Failed to create vehicle",
      issues: err.errors || undefined,
    });
  }
};

export const handleGetAllVehicles = async (_req: Request, res: Response) => {
  const vehicles = await getAllVehicles();
  res.json({ vehicles });
};


export const handleGetVehicleById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const vehicle = await getVehicleById(id);
    res.json({ vehicle });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};


export const handleUpdateVehicle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = updateVehicleSchema.parse(req.body);
    const vehicle = await updateVehicle(id, data);
    res.json({
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Failed to update vehicle",
      issues: err.errors || undefined,
    });
  }
};

export const handleDeleteVehicle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await deleteVehicle(id);
    res.json({
      message: "Vehicle deleted successfully",
      deleted,
    });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
