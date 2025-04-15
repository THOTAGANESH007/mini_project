import React, { useState } from 'react';

const dummyBills = Array.from({ length: 30 }, (_, i) => ({
  sNo: i + 1,
  userId: `user${i + 1}`,
  userPhone: `9990000${(i + 1).toString().padStart(3, '0')}`,
  category: ['Electricity', 'Water', 'Internet'][i % 3],
  amount: (Math.random() * 1000 + 100).toFixed(2),
  date: new Date(2025, 3, (i % 30) + 1).toLocaleDateString('en-CA'), // 'YYYY-MM-DD'
}));

const BillsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter States
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Apply Filters
  const applyFilters = () => {
    setCurrentPage(1);
  };

  const filteredBills = dummyBills.filter((bill) => {
    const matchCategory = filterCategory ? bill.category === filterCategory : true;
    const matchDate = filterDate ? bill.date === filterDate : true;
    const matchPhone = filterPhone ? bill.userPhone.includes(filterPhone) : true;
    const matchMin = minAmount ? parseFloat(bill.amount) >= parseFloat(minAmount) : true;
    const matchMax = maxAmount ? parseFloat(bill.amount) <= parseFloat(maxAmount) : true;
    return matchCategory && matchDate && matchPhone && matchMin && matchMax;
  });

  const totalPages = Math.ceil(filteredBills.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentBills = filteredBills.slice(startIndex, startIndex + rowsPerPage);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">All Payments History</h1>

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

        {/* <div className="flex items-end">
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div> */}
      </div>

      {/* Pagination Control */}
      <div className="mb-4 text-right">
        <label className="mr-2">Rows per page:</label>
        <select value={rowsPerPage} onChange={handleRowsChange} className="border px-2 py-1">
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
            <th className="border border-gray-400 p-2">User ID</th>
            <th className="border border-gray-400 p-2">Phone</th>
            <th className="border border-gray-400 p-2">Category</th>
            <th className="border border-gray-400 p-2">Amount (₹)</th>
            <th className="border border-gray-400 p-2">Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {currentBills.length > 0 ? (
            currentBills.map((bill) => (
              <tr key={bill.sNo}>
                <td className="border text-center border-gray-400 p-2">{bill.sNo}</td>
                <td className="border text-center border-gray-400 p-2">{bill.userId}</td>
                <td className="border text-center border-gray-400 p-2">{bill.userPhone}</td>
                <td className="border text-center border-gray-400 p-2">{bill.category}</td>
                <td className="border text-center border-gray-400 p-2">₹{bill.amount}</td>
                <td className="border text-center border-gray-400 p-2">{bill.date}</td>
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
