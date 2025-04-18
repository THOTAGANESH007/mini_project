import BillModel from "../models/Bill.js";
import AppointMentModel from "../models/AppointMent.js";
import ComplaintModel from "../models/Complaint.js";

// View all bills (optionally filter with payment_status = "Paid")
export const viewBills = async (req, res) => {
  try {
    const bills = null;
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
      bills = await BillModel.find();
    }

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
    const { email, role } = req.body;
    const appointments = null;
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

// View all complaints
export const viewComplaints = async (req, res) => {
  try {
    const complaints = null;
    if (
      email === "sanitizationOfficer123@gmail.com" &&
      role == "Sanitation Officer"
    ) {
      complaints = ComplaintModel.find({ category: "Sanitation" });
    } else if (
      email === "waterOfficer123@gmail.com" &&
      role == "Water Officer"
    ) {
      complaints = ComplaintModel.find({ category: "Water_Service" });
    } else if (
      email === "electricOfficer123@gmail.com" &&
      role == "Electric Officer"
    ) {
      complaints = ComplaintModel.find({ category: "Electrical" });
    } else {
      complaints = await ComplaintModel.find();
    }
    res.json({ success: true, data: complaints });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching complaints", error });
  }
};
