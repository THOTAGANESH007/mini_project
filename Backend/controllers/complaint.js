import Complaint from "../models/Complaint.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
// const mongoose=require("mongoose");
import mongoose from "mongoose";
// Create Complaint

export async function addComplaints(req, res) {
  try {
    // if (!req.userId) {
    //   return res.status(401).json({ message: "User not authenticated" });
    // }
    console.log("image file:", req.file);
    const { userId,category, email, phone,status, description } = req.body;
    // const userId = req.userId; // ✅ Fix: Get userId from req.user
    console.log("uid1", userId);
    const image = req.file; //multer middleware
    if (!image) {
      return res
        .status(400)
        .json({ message: "No file uploaded", error: true, success: false });
    }

    const upload = await uploadImageCloudinary(image);
    console.log("url", upload.url);
    const complaint = new Complaint({
      userId,
      category,
      email,
      phone,
      status,
      description,
      imageUrl: upload.url,
    });

    await complaint.save();
    res
      .status(201)
      .json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting complaint", error: error.message });
  }
}

// Get All Complaints
export async function getComplaints(req, res) {
  try {
    const { userId } = req.query; // Get userId from query parameter
    const complaints = await Complaint.find({ userId })
      .populate("userId", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
      error: error.message,
    });
  }
}

//getOneComplaint
export async function getOneComplaint(req,res){
  try {
    const { id } = req.params;
    console.log("Requested Complaint ID:", id);

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid complaint ID" });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: complaint });
  } catch (error) {
    console.error("Error fetching complaint:", error); // Logs the real error
    res.status(500).json({ success: false, message: "Error fetching complaint", error: error.message });
  }
}

// Update Complaint Status
export const updateComplaints = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id);
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: updatedComplaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
