import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/payment");
        setPaymentData(response.data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setError("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center my-4">
        Transaction History
      </h2>
      <div className="px-5">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">S.No</th>
                <th className="border border-gray-400 px-4 py-2">Category</th>
                <th className="border border-gray-400 px-4 py-2">Amount</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">
                  Payment Method
                </th>
                <th className="border border-gray-400 px-4 py-2">Due Date</th>
                <th className="border border-gray-400 px-4 py-2">User Email</th>
                <th className="border border-gray-400 px-4 py-2">User Phone</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((item) => (
                <tr key={item.sno}>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.sno}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    ₹{item.amount}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.payment_status}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.payment_method}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.due_date}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.user_email}
                  </td>
                  <td className="border border-gray-400 px-4 text-center py-2">
                    {item.user_phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <br />
        <br />
      </div>
    </div>
  );
};

export default PaymentHistory;
