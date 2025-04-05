import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Home.css';

const Info = () => {
    const [selectedDept, setSelectedDept] = useState('Electricity');

    const departmentDetails = {
        Electricity: [
            { name: 'John Doe', designation: 'Chief Engineer', contact: '+1 111 222 333' },
            { name: 'Jane Smith', designation: 'Assistant Engineer', contact: '+1 444 555 666' },
            { name: 'Mark Lee', designation: 'Technician', contact: '+1 777 888 999' },
        ],
        Sanitation: [
            { name: 'Sara Ali', designation: 'Sanitation Head', contact: '+1 123 456 789' },
            { name: 'Tom Hardy', designation: 'Field Supervisor', contact: '+1 321 654 987' },
            { name: 'Rita Gomez', designation: 'Worker', contact: '+1 234 567 890' },
        ],
        Geography: [
            { name: 'Alan Walker', designation: 'Geographer', contact: 'alan@region.gov' },
            { name: 'Nina Brown', designation: 'Research Officer', contact: 'nina@region.gov' },
            { name: 'David Chen', designation: 'Cartographer', contact: 'david@region.gov' },
        ],
        'Census Department': [
            { name: 'Emily Rose', designation: 'Census Officer', contact: '+1 999 888 777' },
            { name: 'Oliver Twist', designation: 'Data Analyst', contact: '+1 666 555 444' },
            { name: 'Sophia Hill', designation: 'Surveyor', contact: '+1 333 222 111' },
        ],
    };

    return (
        <div className="p-4 info-main">
            {/* Filter Buttons */}
            <div className="flex justify-evenly flex-wrap gap-2 mb-6">
                {Object.keys(departmentDetails).map((dept) => (
                    <button
                        key={dept}
                        className={`py-1 px-3 text-lg border-2 rounded-2xl filter-btn
                            ${selectedDept === dept
                                ? 'select'
                                : 'bg-gray-200 border-transparent notselect'} 
                            hover:bg-blue-500 hover:text-white transition`}
                        onClick={() => setSelectedDept(dept)}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            {/* Table for Selected Department */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white rounded-md">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Designation</th>
                            <th className="py-2 px-4 border-b">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentDetails[selectedDept].map((person, index) => (
                            <tr key={index} className="hover:bg-blue-50 transition">
                                <td className="text-center py-2 px-4 border-b font-medium">{person.name}</td>
                                <td className="text-center py-2 px-4 border-b">{person.designation}</td>
                                <td className="text-center py-2 px-4 border-b">{person.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-center">
    <Link to={'/officals/'}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            More contacts...
        </button>
    </Link>
</div>
        </div>
    );
};

export default Info;
