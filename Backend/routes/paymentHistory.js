import express from "express";
import {
  getPaymentHistory,
  getPaymentsByDepartment,
} from "../controllers/paymentController.js";

const paymentHistory = express.Router();

// Route to fetch payment history
paymentHistory.get("/", getPaymentHistory);
paymentHistory.get("/department/:department", getPaymentsByDepartment);

export default paymentHistory;
