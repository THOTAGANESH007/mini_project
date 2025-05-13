import React, { useState, useEffect } from "react";
import axios from "axios";

const BillsPage = () => {
  const [allBills, setAllBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/representatives/view/bills`,
          {
            withCredentials: true,
          }
        );
        const bills = res.data.data.map((bill) => ({
          ...bill,
          dueDate: bill.dueDate?.split("T")[0], // format to YYYY-MM-DD if needed
        }));
        setAllBills(bills);
        setFilteredBills(bills);
      } catch (err) {
        console.error("Failed to fetch bills", err);
        setError("Failed to fetch bills");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => {
    let filtered = allBills.filter((bill) => {
      const matchCategory = filterCategory
        ? bill.billType === filterCategory
        : true;
      const matchDate = filterDate ? bill.dueDate === filterDate : true;
      const matchPhone = filterPhone ? bill.phone.includes(filterPhone) : true;
      const matchMin = minAmount
        ? parseFloat(bill.total_amount) >= parseFloat(minAmount)
        : true;
      const matchMax = maxAmount
        ? parseFloat(bill.total_amount) <= parseFloat(maxAmount)
        : true;
      return matchCategory && matchDate && matchPhone && matchMin && matchMax;
    });

    setFilteredBills(filtered);
    setCurrentPage(1);
  }, [filterCategory, filterDate, filterPhone, minAmount, maxAmount, allBills]);

  const totalPages = Math.ceil(filteredBills.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentBills = filteredBills.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div className="p-6 text-center">Loading bills...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!allBills || allBills.length === 0)
    return <div className="p-6 text-center">No bills available.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        All Payments History
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full border px-2 py-1"
          >
            <option value="">All</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Date of Payment:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number:</label>
          <input
            type="text"
            placeholder="Enter phone"
            value={filterPhone}
            onChange={(e) => setFilterPhone(e.target.value)}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Min Amount (₹):</label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full border px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Max Amount (₹):</label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-full border px-2 py-1"
          />
        </div>
      </div>

      {/* Rows control */}
      <div className="mb-4 text-right">
        <label className="mr-2">Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={handleRowsChange}
          className="border px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-400 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-400 p-2">S.No</th>
            <th className="border border-gray-400 p-2">Phone</th>
            <th className="border border-gray-400 p-2">Email</th>
            <th className="border border-gray-400 p-2">Category</th>
            <th className="border border-gray-400 p-2">Amount (₹)</th>
            <th className="border border-gray-400 p-2">Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {currentBills.length > 0 ? (
            currentBills.map((bill, index) => (
              <tr key={index}>
                <td className="border text-center border-gray-400 p-2">
                  {startIndex + index + 1}
                </td>
                <td className="border text-center border-gray-400 p-2">
                  {bill.phone}
                </td>
                <td className="border text-center border-gray-400 p-2">
                  {bill.email}
                </td>
                <td className="border text-center border-gray-400 p-2">
                  {bill.billType}
                </td>
                <td className="border text-center border-gray-400 p-2">
                  ₹{bill.total_amount}
                </td>
                <td className="border text-center border-gray-400 p-2">
                  {bill.dueDate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div>
          Page {currentPage} of {totalPages || 1}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillsPage;
