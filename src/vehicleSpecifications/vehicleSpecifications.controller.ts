import { Request, Response } from "express";
import {
  createVehicleSpec,
  getAllVehicleSpecs,
  getVehicleSpecById,
  updateVehicleSpec,
  deleteVehicleSpec,
} from "../vehicleSpecifications/vehicleSpecifications.service";
import { vehicleSpecSchema } from "../validation/vehicleSpecificationsValidator"; 


export const createSpec = async (req: Request, res: Response) => {
  const parsed = vehicleSpecSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const newSpec = await createVehicleSpec(parsed.data);
    res.status(201).json({
      message: "Vehicle specification created successfully",
      spec: newSpec,
    });
  } catch (error) {
    console.error("❌ Error creating vehicle spec:", error);
    res.status(500).json({ message: "Failed to create vehicle specification." });
  }
};


export const getAllSpecs = async (_req: Request, res: Response) => {
  try {
    const specs = await getAllVehicleSpecs();
    res.status(200).json(specs);
  } catch (error) {
    console.error("❌ Error fetching specs:", error);
    res.status(500).json({ message: "Failed to fetch vehicle specifications." });
  }
};


export const getSpecById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const spec = await getVehicleSpecById(id);
    if (!spec) {
      res.status(404).json({ message: "Specification not found." });
      return;
    }
    res.status(200).json(spec);
  } catch (error) {
    console.error("❌ Error getting spec by ID:", error);
    res.status(500).json({ message: "Failed to fetch specification." });
  }
};


export const updateSpec = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const parsed = vehicleSpecSchema.partial().safeParse(req.body); 

  if (!parsed.success) {
     res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const updatedSpec = await updateVehicleSpec(id, parsed.data);
    if (!updatedSpec) {
     res.status(404).json({ message: "Specification not found." });
     return;
    }
    res.status(200).json({
      message: "Specification updated successfully",
      spec: updatedSpec,
    });
  } catch (error) {
    console.error("❌ Error updating spec:", error);
    res.status(500).json({ message: "Failed to update specification." });
  }
};


export const deleteSpec = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteVehicleSpec(id);
    if (!deleted) {
      res.status(404).json({ message: "Specification not found." });
      return;
    }
    res.status(200).json({ message: "Specification deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting spec:", error);
    res.status(500).json({ message: "Failed to delete specification." });
  }
};
