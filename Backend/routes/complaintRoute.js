import express from "express";
import {
  addComplaints,
  getComplaints,
  updateComplaints,
} from "../controllers/complaint.js";
import auth from "../middlewares/auth.js"; // ✅ Import middleware

const complaintRouter = express.Router();

complaintRouter.post("/", auth, addComplaints); // ✅ Protect route
complaintRouter.get("/", auth, getComplaints);
complaintRouter.patch("/:id", auth, updateComplaints);

export default complaintRouter;
