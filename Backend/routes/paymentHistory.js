import express from "express";
import {
  getPaymentHistory,
  getPaymentsByDepartment,
} from "../controllers/paymentController.js";
import auth from "../middlewares/auth.js";

const paymentHistory = express.Router();

// Route to fetch payment history
paymentHistory.get("/", auth, getPaymentHistory);
paymentHistory.get("/department/:department", auth, getPaymentsByDepartment);

export default paymentHistory;
