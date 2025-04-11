import React from 'react';

const ComplaintHistory = () => {
  const complaintsData = [
    {
      sno: 1,
      category: 'Electricity',
      description: 'Frequent power cuts during evening hours.',
      status: 'Pending',
    },
    {
      sno: 2,
      category: 'Water Service',
      description: 'No water supply in the morning for 3 days.',
      status: 'Completed',
    },
    {
      sno: 3,
      category: 'Drainage',
      description: 'Blocked drainage causing foul smell and overflow.',
      status: 'Pending',
    },
    {
      sno: 4,
      category: 'Others',
      description: 'Street light not working in lane 4.',
      status: 'Completed',
    },
    {
      sno: 5,
      category: 'Water Service',
      description: 'Rusty water from taps in the building.',
      status: 'Rejected',
    },
    {
      sno: 6,
      category: 'Electricity',
      description: 'Sparks observed in the main switch box.',
      status: 'Pending',
    },
    {
      sno: 7,
      category: 'Drainage',
      description: 'Drain near block B is overflowing every night.',
      status: 'Completed',
    },
    {
      sno: 8,
      category: 'Others',
      description: 'Unauthorized vehicle parking near the entrance.',
      status: 'Pending',
    },
    {
      sno: 9,
      category: 'Water Service',
      description: 'Very low water pressure since last week.',
      status: 'Completed',
    },
    {
      sno: 10,
      category: 'Electricity',
      description: 'Flickering lights in the common area.',
      status: 'Rejected',
    },
  ];

  return (
    <div className="p-4">
      <br></br>
      <h2 className="text-xl font-bold text-center mb-4">Complaints Table</h2>
      {/* <br></br> */}
      <div className='p-4'>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">S.No</th>
            <th className="border border-gray-400 px-4 py-2">Category</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaintsData.map((complaint) => (
            <tr key={complaint.sno}>
              <td className="border border-gray-400 text-center px-4 py-2">{complaint.sno}</td>
              <td className="border border-gray-400 px-4 text-center py-2">{complaint.category}</td>
              <td className="border border-gray-400 px-4  py-2">{complaint.description}</td>
              <td className={`border border-gray-400 px-4 text-center py-2 ${complaint.status === 'Pending' ? 'text-yellow-600' : complaint.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                {complaint.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ComplaintHistory;
