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

complaintRouter.post("/", auth,upload.single("image"), addComplaints);
complaintRouter.get("/",auth, getComplaints);
complaintRouter.get('/:id',auth,getOneComplaint);
complaintRouter.patch("/:id",auth,  updateComplaints);

export default complaintRouter;
