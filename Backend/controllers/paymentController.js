import BillModel from "../models/Bill.js";

// Function to fetch payment history from MongoDB
export const fetchPaymentHistory = async () => {
  try {
    const bills = await BillModel.find()
      .populate("userId", "email mobile")
      .exec();

    // Map the bills to the desired structure for the frontend
    return bills.map((bill, index) => ({
      sno: index + 1, // Serial number
      category: bill.billType,
      amount: bill.total_amount,
      payment_status: bill.payment_status,
      payment_method: bill.payment_method || "N/A", // Default to 'N/A' if not available
      due_date: bill.dueDate.toISOString().split("T")[0], // Format the date to 'YYYY-MM-DD'
      user_email: bill.userId ? bill.userId.email : "N/A", // Assuming userId is populated
      user_phone: bill.userId ? bill.userId.mobile : "N/A", // Assuming userId is populated
    }));
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw new Error("Error fetching payment history");
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await fetchPaymentHistory();
    res.json(paymentHistory); // Send the formatted data as a JSON response
  } catch (error) {
    res.status(500).json({
      message: "Error fetching payment history",
      error: error.message,
    });
  }
};

// 🔹 Get payments filtered by department (billType)
export const getPaymentsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    // Validate department value
    const validDepartments = ["Electricity", "Water", "Sanitation"];
    if (!validDepartments.includes(department)) {
      return res.status(400).json({ message: "Invalid department" });
    }

    const paymentHistory = await fetchPaymentHistory({ billType: department });
    res.json(paymentHistory);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching department payment history",
      error: error.message,
    });
  }
};
