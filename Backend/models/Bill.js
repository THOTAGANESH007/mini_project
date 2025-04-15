import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bill_number: { type: String, required: true, unique: true },
  billType: {
    type: String,
    enum: ["Electricity", "Water", "Other"],
    required: true,
  },
  total_amount: { type: Number, required: true },
  payment_status: {
    type: String,
    enum: ["Paid", "Unpaid", "OverDue"],
    default: "Unpaid",
  },
  payment_method: {
    type: String,
    enum: ["Cash", "CreditCard", "DebitCard", "NetBanking", "Upi", "Other"],
  },
  dueDate: { type: Date, required: true },
});
const BillModel = mongoose.model("Bill", BillSchema);
export default BillModel;
