import BillModel from "../models/Bill.js";
import AppointMentModel from "../models/AppointMent.js";
import ComplaintModel from "../models/Complaint.js";
import UserModel from "../models/user.js";

// View all bills (optionally filter with payment_status = "Paid")
export const viewBills = async (req, res) => {
  try {
    let bills = null;
    const userId = req.userId;

    const { email, role } = await UserModel.findOne({ _id: userId });
    console.log("User email and role:", email, role); // log email and role
    if (
      email === "sanitizationOfficer123@gmail.com" &&
      role == "Sanitation Officer"
    ) {
      bills = await BillModel.find({ billType: "Sanitation" });
    } else if (
      email === "waterOfficer123@gmail.com" &&
      role == "Water Officer"
    ) {
      bills = await BillModel.find({ billType: "Water" });
    } else if (
      email === "electricOfficer123@gmail.com" &&
      role == "Electric Officer"
    ) {
      bills = await BillModel.find({ billType: "Electricity" });
    } else {
      console.log("in admin bill")
      bills = await BillModel.find({});
      console.log("bill",bills)
    }
console.log("bill",bills)
    res.json({ success: true, data: bills });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching bills", error });
  }
};

// View all appointments
export const viewAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const { email, role } = await UserModel.findOne({ _id: userId });
    let appointments = null;
    if (
      email === "sanitizationOfficer123@gmail.com" &&
      role == "Sanitation Officer"
    ) {
      appointments = await AppointMentModel.find({
        department: "Sanitation",
      });
    } else if (
      email === "waterOfficer123@gmail.com" &&
      role == "Water Officer"
    ) {
      appointments = await AppointMentModel.find({
        department: "Water_Service",
      });
    } else if (
      email === "electricOfficer123@gmail.com" &&
      role == "Electric Officer"
    ) {
      appointments = await AppointMentModel.find({
        department: "Electrical",
      });
    } else {
      //for admin
      appointments = await AppointMentModel.find();
    }
    res.json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointments", error });
  }
};

export const viewComplaints = async (req, res) => {
  try {
    const userId = req.userId;
    const { email, role } = await UserModel.findOne({ _id: userId });
    let complaints  =null

    if (
      email === "sanitizationOfficer123@gmail.com" &&
      role === "Sanitation Officer"
    ) {
      complaints = await ComplaintModel.find({ category: "Sanitation" });
    } else if (
      email === "waterOfficer123@gmail.com" &&
      role === "Water Officer"
    ) {
      complaints = await ComplaintModel.find({ category: "Water_Service" });
    } else if (
      email === "electricOfficer123@gmail.com" &&
      role === "Electric Officer"
    ) {
      complaints = await ComplaintModel.find({ category: "Electrical" });
    } else {
      complaints = await ComplaintModel.find(); // all complaints
    }

    res.json({ success: true, data: complaints });
  } catch (error) {
    console.error("Error in viewComplaints:", error); // log full error
    res.status(500).json({
      success: false,
      message: "Error fetching complaints",
      error: error.message,
    });
  }
};

