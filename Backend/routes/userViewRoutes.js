import express from "express";
import {
  viewBills,
  viewAppointments,
  viewComplaints,
} from "../controllers/userViewController.js";

const userViewRouter = express.Router();

userViewRouter.get("/bills", viewBills); // You can add ?status=Paid if filtering
userViewRouter.get("/appointments", viewAppointments);
userViewRouter.get("/complaints", viewComplaints);

export default userViewRouter;
