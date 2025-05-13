import ComplaintModel from "../models/Complaint.js";
import UserModel from "../models/user.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
// const mongoose=require("mongoose");
import mongoose from "mongoose";
// Create Complaint

export async function addComplaints(req, res) {
  try {
    console.log(req.body);
    const { userId, category, email, phone, status, description } = req.body;
    const image = req.file; //multer middleware
    if (!image) {
      return res
        .status(400)
        .json({ message: "No file uploaded", error: true, success: false });
    }

    const upload = await uploadImageCloudinary(image);
    console.log("Cloudinary Upload Result", upload);

    const complaint = new ComplaintModel({
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
      .json({ message: "Complaint submitted successfully", data: complaint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting complaint", error: error.message });
  }
}

// Get All Complaints
export async function getComplaints(req, res) {
  try {
    const userId = req.userId; // Get userId from query parameter
    const { email } = await UserModel.findOne({ _id: userId });
    
    const complaints = await ComplaintModel.find({ email });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
      error: error.message,
    });
  }
}

//getOneComplaint
export async function getOneComplaint(req, res) {
  try {
    const { id } = req.params;
   

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid complaint ID" });
    }

    const complaint = await ComplaintModel.findById(id);

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: complaint });
  } catch (error) {
    console.error("Error fetching complaint:", error); // Logs the real error
    res.status(500).json({
      success: false,
      message: "Error fetching complaint",
      error: error.message,
    });
  }
}

// Update Complaint Status
export const updateComplaints = async (req, res) => {
  try {
    const id = req.params;
    const { status } = req.body;
    
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { status },
      { new: true }
    );
   

    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: updatedComplaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Complaints by Category
export async function getComplaintByDepartment(req, res) {
  try {
    
    const { department:category } = req.params;
   
    // Check if the category is valid
    const validCategories = ["Electrical", "Sanitation", "Water_Service"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid category. Must be one of Electrical, Sanitation, or Water_Service",
      });
    }

    const complaints = await ComplaintModel.find({ category });
// console.log("complaints",category, complaints);
    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No complaints found in the ${category} category`,
      });
    }

    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    console.error("Error fetching complaints by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching complaints by category",
      error: error.message,
    });
  }
}
