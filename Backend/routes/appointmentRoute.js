import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentsByTheUserId,
  getAppointmentsByDepartment,
  getAppointmentById,
  approveAppointment,
} from "../controllers/appointmentController.js";
import auth from "../middlewares/auth.js";


const appointmentRoute = express.Router();

appointmentRoute.post("/book", bookAppointment);
appointmentRoute.get("/all", auth, getAllAppointments);
appointmentRoute.get("/byUser", getAppointmentsByTheUserId);
appointmentRoute.get("/:id",getAppointmentById);
// In appointmentRoute.js
appointmentRoute.get("/department/:department", getAppointmentsByDepartment);

appointmentRoute.put("/approve/:appointmentId", approveAppointment);

export default appointmentRoute;
