import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const stripe = useStripe();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billType, setBillType] = useState("Electricity");
  const [totalAmount, setTotalAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!email || !phone || !billNumber || !totalAmount || !dueDate) {
      console.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/api/stripe/create-checkout-session",
        {
          userId: "user-id-placeholder",
          email,
          phone,
          bill_number: billNumber,
          billType,
          total_amount: totalAmount,
          payment_method: "CreditCard",
          dueDate,
        },
        { withCredentials: true }
      );

      const { id } = response.data;

      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleCheckout} className="checkout-form">
        <h2 className="form-title">Payment Details</h2>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Bill Number:</label>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Bill Type:</label>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            required
            className="form-input"
          >
            <option value="Electricity">Electricity</option>
            <option value="Water_Service">Water</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        <div className="form-group">
          <label>Total Amount:</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="checkout-button" disabled={!stripe}>
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Checkout;
