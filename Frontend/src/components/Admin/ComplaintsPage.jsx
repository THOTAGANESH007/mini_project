import React, { useState } from 'react';

const categories = ['Electrical', 'Drainage', 'Water Service'];
const statuses = ['Pending', 'Accepted', 'Rejected', 'Resolved'];

const dummyComplaints = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  userId: `user${i + 1}`,
  image: `https://www.nextind.eu/wp-content/webp-express/webp-images/uploads/water-pipe-3.jpg.webp`,
  category: categories[i % categories.length],
  status: statuses[i % statuses.length],
}));

const ComplaintsPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const filteredComplaints = dummyComplaints.filter((comp) => {
    const matchCategory = filterCategory ? comp.category === filterCategory : true;
    const matchStatus = filterStatus ? comp.status === filterStatus : true;
    return matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filteredComplaints.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div style={{backgroundColor:""}} className="p-6 bg-black text-white">
      <h1 className="text-2xl font-semibold text-center mb-6">All Complaints</h1>

      {/* Filters */}
      <div className=" flex justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-1">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              handleFilterChange();
            }}
            className=" bg-black rounded-xl text-whtie w-full border px-2 py-1"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              handleFilterChange();
            }}
            className="bg-black rounded-xl text-whtie w-full border px-2 py-1"
          >
            <option value="">All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pagination Dropdown */}
      <div className='flex justify-end'>
      <div className="mb-6">
        <label className="block mb-1">Cards per page:</label>
        <select
          value={rowsPerPage}
          onChange={handleRowsChange}
          className=" rounded-xl bg-black text-whtie w-1/2 border  py-1"
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      </div>
      {/* Cards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {currentComplaints.length > 0 ? (
          currentComplaints.map((complaint) => (
            <div key={complaint.id} style={{backgroundColor:"#262626"}} className=" rounded-xl shadow p-4 bg-white">
              <img src={complaint.image} alt="complaint" className="w-full h-40 object-cover rounded mb-3" />
              <div className="text-sm">
                <p><strong>User ID:</strong> {complaint.userId}</p>
                <p><strong>Category:</strong> {complaint.category}</p>
                <p><strong>Status:</strong> <span className="capitalize">{complaint.status}</span></p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No complaints found.</div>
        )}
      </div>

      {/* Pagination Controls */}
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

export default ComplaintsPage;
