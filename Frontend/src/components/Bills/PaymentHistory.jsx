import React from 'react';

const PaymentHistory = () => {
  const dummyData = [
    { sno: 1, category: 'Electricity', amount: 120, date: '2025-04-01' },
    { sno: 2, category: 'Others', amount: 80, date: '2025-04-02' },
    { sno: 3, category: 'Water', amount: 200, date: '2025-04-03' },
    { sno: 4, category: 'Electricity', amount: 150, date: '2025-04-04' },
    { sno: 5, category: 'Water', amount: 100, date: '2025-04-05' },
    { sno: 6, category: 'Electricity', amount: 50, date: '2025-04-06' },
    { sno: 7, category: 'Drainage', amount: 90, date: '2025-04-07' },
    { sno: 8, category: 'Electricity', amount: 180, date: '2025-04-08' },
    { sno: 9, category: 'Medical', amount: 300, date: '2025-04-09' },
    { sno: 10, category: 'Others', amount: 75, date: '2025-04-10' },
  ];

  return (
    <div className="p-4">
        {/* <h1 className=''>Payment</h1> */}
        <br></br><br></br>
        <br></br>
      <h2 className="text-3xl font-bold text-center my-4">Transaction History</h2>
      <div className='px-5'>
      <table className="w-full border-collapse border  border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">S.No</th>
            <th className="border border-gray-400 px-4 py-2">Category</th>
            <th className="border border-gray-400 px-4 py-2">Amount</th>
            <th className="border border-gray-400 px-4 py-2">Date of Payment</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.sno}>
              <td className="border border-gray-400 px-4 text-center py-2">{item.sno}</td>
              <td className="border border-gray-400 px-4 text-center py-2">{item.category}</td>
              <td className="border border-gray-400 px-4 text-center py-2">{item.amount}</td>
              <td className="border border-gray-400 px-4 text-center py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br><br></br>
      </div>
    </div>
  );
};

export default PaymentHistory;
