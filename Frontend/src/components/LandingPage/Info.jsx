import { useState } from 'react';

import '../../style/Home.css';
const Info = () => {
    const [selectedFilter, setSelectedFilter] = useState('Population');

    // Data for each filter
    const filterData = {
        Population: 'The population of the region is approximately 1.5 million.',
        Census: 'The latest census was conducted in 2021, recording vital demographic data.',
        Geography: 'The region spans 300 sq km with diverse landscapes and rich biodiversity.',
        Officials: 'For official inquiries, contact: +1 234 567 890 or email: info@region.gov'
    };

    return (
        <div className="p-4 info-main">
            {/* Filter Buttons */}
            <div className="flex justify-evenly mb-6">
                {Object.keys(filterData).map((filter) => (
                    <button
                        key={filter}
                        className={` py-0.5 text-lg  border-2 rounded-2xl filter-btn
                        ${selectedFilter === filter 
                            ? 'select'
                            : 'bg-gray-200  border-transparent notselect'} 
                        hover:bg-blue-500 hover:text-white transition`}
                        onClick={() => setSelectedFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            
            {/* Display Filter Data */}
            <div className="p-4 text-center  rounded-md bg-blue-50">
                <h2 className="text-xl font-semibold mb-2">{selectedFilter} Info</h2>
                <p>{filterData[selectedFilter]}</p>
            </div>
        </div>
    );
};

export default Info;
