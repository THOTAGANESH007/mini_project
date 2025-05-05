import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CreditCard, Mail, Phone, Hash, Calendar, Tag, DollarSign } from "lucide-react";

const Checkout = () => {
  const stripe = useStripe();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billType, setBillType] = useState("Electrical");
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
    <div className="max-w-md mx-auto my-12 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-6 text-white">
        <div className="flex items-center justify-center mb-2">
          <CreditCard size={28} className="mr-2" />
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
        </div>
        <p className="text-center text-blue-100">Complete your bill payment</p>
      </div>

      <form onSubmit={handleCheckout} className="p-6 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <Mail size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Email Address</label>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <Phone size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="(123) 456-7890"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <Hash size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Bill Number</label>
          </div>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            required
            placeholder="Enter your bill number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <Tag size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Bill Type</label>
          </div>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
          >
            <option value="Electrical">Electricity</option>
            <option value="Water_Service">Water</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <DollarSign size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Total Amount</label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              required
              placeholder="0.00"
              className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center mb-1">
            <Calendar size={16} className="text-blue-500 mr-2" />
            <label className="text-sm font-medium text-gray-700">Due Date</label>
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            disabled={!stripe}
          >
            <div className="flex items-center justify-center">
              <CreditCard size={20} className="mr-2" />
              Proceed to Payment
            </div>
          </button>
        </div>
        
        <div className="text-center text-xs text-gray-500 pt-2">
          <p>Secure payment processing by Stripe</p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;