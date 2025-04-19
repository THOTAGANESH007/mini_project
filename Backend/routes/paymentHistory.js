import express from "express";
import { getPaymentHistory } from "../controllers/paymentController.js";

const paymentHistory = express.Router();

// Route to fetch payment history
paymentHistory.get("/", getPaymentHistory);

export default paymentHistory;
