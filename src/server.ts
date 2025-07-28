import express, { Application, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// ✅ Import routers
import authRouter from "auth/auth.route";
import locationsRouter from "locations/locations.route";
import vehiclespecificationsRouter from "vehicleSpecifications/vehicleSpecifications.route";
import bookingRouter from "bookings/bookings.route";
import vehiclesRouter from "vehicles/vehicles.route";
import usersRouter from "users/users.route";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger";
import paymentsRouter from "payments/payments.route";
import supportRouter from "supportTickets/supportTickets.route";

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 5000

//  Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}))

//  Route handlers
app.use("/api/auth", authRouter); 
app.use("/api/locations", locationsRouter);
app.use("/api/vehiclespecifications", vehiclespecificationsRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/payments", paymentsRouter);
app.use("/api/support-tickets", supportRouter);

app.use("/api/support", supportRouter);
app.get("/", (req, res: Response) => {
  res.send("🚗 Vehicle Rental Payment API is running.");
});

// Server start
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
