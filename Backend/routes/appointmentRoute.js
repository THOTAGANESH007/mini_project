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

appointmentRoute.post("/book",auth, bookAppointment);
appointmentRoute.get("/all", auth, getAllAppointments);
appointmentRoute.get("/byUser",auth, getAppointmentsByTheUserId);
appointmentRoute.get("/:id",auth,getAppointmentById);
// In appointmentRoute.js
appointmentRoute.get("/department/:department", auth,getAppointmentsByDepartment);

appointmentRoute.put("/approve/:appointmentId",auth, approveAppointment);

export default appointmentRoute;
