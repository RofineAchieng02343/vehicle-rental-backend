import { Request, Response } from "express";
import {createLocationSchema, updateLocationSchema } from "../validation/locationsValidato";
import {
  createLocation as createLocationService,
  getAllLocations as getAllLocationsService,
  getLocationById as getLocationByIdService,
  updateLocation as updateLocationService,
  deleteLocation as deleteLocationService,
} from "../locations/locations.service";



// ✅ Create location
export const createLocation = async (req: Request, res: Response) => {
  try {
    const data = createLocationSchema.parse(req.body);
    const location = await createLocationService(data);
    res.status(201).json({
      message: "Location created successfully",
      location,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err?.message || "Failed to create location",
      issues: err?.errors || undefined,
    });
  }
};

// ✅ Get all locations
export const getAllLocations = async (_req: Request, res: Response) => {
  const locations = await getAllLocationsService();
  res.json({ locations });
};

// ✅ Get location by ID
export const getLocationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const location = await getLocationByIdService(id);
    res.json({ location });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// ✅ Update location
export const updateLocation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = updateLocationSchema.parse(req.body);
    const location = await updateLocationService(id, data);
    res.json({
      message: "Location updated successfully",
      location,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Failed to update location",
      issues: err.errors || undefined,
    });
  }
};

// ✅ Delete location
export const deleteLocation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await deleteLocationService(id);
    res.json({
      message: "Location deleted successfully",
      deleted,
    });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
