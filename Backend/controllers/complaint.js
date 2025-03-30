import Complaint from "../models/Complaint.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// Create Complaint

export async function addComplaints(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    console.log("image file:", req.file);
    const { category, email, phone, description } = req.body;
    const userId = req.userId; // ✅ Fix: Get userId from req.user
    console.log("uid1", userId);
    const image = req.file; //multer middleware
    if (!image) {
      return res
        .status(400)
        .json({ message: "No file uploaded", error: true, success: false });
    }

    const upload = await uploadImageCloudinary(image);

    const complaint = new Complaint({
      userId,
      category,
      email,
      phone,
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
    req.user = req.user || {};
    const complaints = await Complaint.find({ userId: req.user.id }).populate(
      "userId",
      "name email"
    );
    res.json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching complaints", error: error.message });
  }
}

// Update Complaint Status
export async function updateComplaints(req, res) {
  try {
    req.user = req.user || {};
    const { status } = req.body;
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );
    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ message: "Complaint not found or unauthorized" });
    }
    res.json({ message: "Complaint updated successfully", updatedComplaint });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating complaint", error: error.message });
  }
}
