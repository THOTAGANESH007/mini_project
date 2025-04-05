import express from "express";
import {
  addComplaints,
  getComplaints,
  updateComplaints,
} from "../controllers/complaint.js";
import auth from "../middlewares/auth.js"; // ✅ Import middleware
import upload from "../middlewares/multer.js";

const complaintRouter = express.Router();

complaintRouter.post("/", upload.single("image"), auth, addComplaints);
complaintRouter.get("/", auth, getComplaints);
complaintRouter.patch("/:id", auth, updateComplaints);

export default complaintRouter;
