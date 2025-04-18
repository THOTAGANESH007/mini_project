import express from "express";
import {
  addComplaints,
  getComplaints,
  updateComplaints,
  getOneComplaint
} from "../controllers/complaint.js";
import auth from "../middlewares/auth.js"; // ✅ Import middleware
import upload from "../middlewares/multer.js";

const complaintRouter = express.Router();

complaintRouter.post("/", upload.single("image"), addComplaints);
complaintRouter.get("/", getComplaints);
complaintRouter.get('/:id',getOneComplaint);
complaintRouter.patch("/:id",  updateComplaints);

export default complaintRouter;
