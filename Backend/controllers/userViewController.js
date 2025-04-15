import BillModel from "../models/Bill.js";
import AppointMentModel from "../models/AppointMent.js";
import ComplaintModel from "../models/Complaint.js";

// View all bills (optionally filter with payment_status = "Paid")
export const viewBills = async (req, res) => {
  try {
    const bills = await BillModel.find(); // Or add { payment_status: "Paid" }
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
    const appointments = await AppointMentModel.find();
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
    const complaints = await ComplaintModel.find();
    res.json({ success: true, data: complaints });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching complaints", error });
  }
};
