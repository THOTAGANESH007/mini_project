import express from "express";
import {
  viewBills,
  viewAppointments,
  viewComplaints,
} from "../controllers/userViewController.js";
import auth from "../middlewares/auth.js";

const userViewRouter = express.Router();

userViewRouter.get("/bills",auth, viewBills); // You can add ?status=Paid if filtering
userViewRouter.get("/appointments",auth, viewAppointments);
userViewRouter.get("/complaints",auth, viewComplaints);

export default userViewRouter;
