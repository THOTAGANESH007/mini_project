import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReceiptText, AlertCircle, Loader } from "lucide-react";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
          { withCredentials: true }
        );
        console.log(response);
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

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="container mx-auto p-6 max-w-6xl"
    >
      <div className="flex items-center justify-center mb-8">
        <ReceiptText className="text-blue-500 mr-3" size={28} />
        <h2 className="text-3xl font-bold text-gray-800">
          Payment Transaction History
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-gray-600 font-medium">
            Loading transaction data...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-lg">
          <AlertCircle className="text-red-500 mb-4" size={40} />
          <p className="text-red-600 font-medium">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No payment records found
                    </td>
                  </tr>
                ) : (
                  paymentData.map((item) => (
                    <tr
                      key={item.sno}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sno}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.billType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ₹{item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            item.payment_status
                          )}`}
                        >
                          {item.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.payment_method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.user_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.user_phone}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
