import mongoose from "mongoose";
import AppointMentModel from "../models/AppointMent.js";

// 1. Book a new appointment
export const bookAppointment = async (req, res) => {
  try {
    const { department, description } = req.body;
    const userId = req.userId;

    const appointment = await AppointMentModel.insertOne({
      userId,
      department,
      description,
    });

    // Mock notification to the department authority

    // const departmentMap = {
    //   Electrical: "Electricity",
    //   Sanitation: "Sanitation",
    //   Water_Service: "Water",
    // };
    // const authorityDepartment = departmentMap[department];

    // console.log(`🚀 Appointment sent to ${authorityDepartment} authority`);

    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

// 2. Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointMentModel.find().populate(
      "userId",
      "name email"
    );
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to get appointments" });
  }
};

// 3. Get appointments of the logged-in user
export const getAppointmentsByTheUserId = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userid:", userId);
    let appointments = await AppointMentModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    console.log("Appointments sent:", appointments);
    // res.status(200).json(appointments);

    res.status(200).json({ msg: "all appointments ", data: appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ error: "Failed to get user's appointments" });
  }
};

//get appointments by id
export const getAppointmentById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const appointment = await AppointMentModel.findById(
      new mongoose.Types.ObjectId(id)
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json({ data: appointment });
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    res.status(500).json({ error: "Failed to get appointment" });
  }
};

// 4. Get appointments by department
export const getAppointmentsByDepartment = async (req, res) => {
  try {
    // const userId=req.userId;

    const { department } = req.params;

    console.log(department);
    const validDepartments = ["Electrical", "Sanitation", "Water_Service"];
    if (!validDepartments.includes(department)) {
      return res.status(400).json({ error: "Invalid department" });
    }

    const appointments = await AppointMentModel.find({
      department: department,
    });
    console.log(department);
    console.log(appointments);

    console.log(appointments);
    res.status(200).json({ data: appointments });
  } catch (error) {
    console.error("Error fetching department appointments:", error);
    res
      .status(500)
      .json({ error: "Failed to get appointments for department" });
  }
};

// controllers/appointmentController.js

export const approveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate, appointmentTime } = req.body;

    const appointment = await AppointMentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
    appointment.appointmentStatus = "Accepted";
    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment approved", data: appointment });
  } catch (error) {
    console.error("Error approving appointment:", error);
    res.status(500).json({ error: "Failed to approve appointment" });
  }
};
