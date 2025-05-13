import express from "express";
import {
  addComplaints,
  getComplaints,
  updateComplaints,
  getOneComplaint,
  getComplaintByDepartment,
} from "../controllers/complaint.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import  complaintSchema  from "../validations/Complaint.validation.js";
import validate from "../middlewares/validate.js";

const complaintRouter = express.Router();

complaintRouter.post("/",auth, upload.single("image"),validate(complaintSchema), addComplaints);
complaintRouter.get("/", auth, getComplaints);
complaintRouter.get("/:id", auth, getOneComplaint);
complaintRouter.patch("/:id", auth, updateComplaints);
complaintRouter.get("/department/:department", auth, getComplaintByDepartment);

export default complaintRouter;
