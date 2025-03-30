import React from 'react'
import '../../style/Home.css'
import { useNavigate } from "react-router-dom";
import ExploreCards from './ExploreCards'
export default function Explore() {
  const navigate = useNavigate();
  return (
    <div className="bg-center relative w-full h-screen bg-cover explore-section" 
         >
        <h1 className='text-7xl font-medium text-center pt-6 exlore-heading'>ATTRACTIONS</h1>
        <h2 className='text-center text-2xl mt-1'>---worth a thousand stories---</h2>
            <div className='explore-cards'>
                <ExploreCards/>
            </div>
            <button
             onClick={() => navigate("/places")}
             className='mx-auto block exlore-button text-lg '>Discover here</button>
    
    </div>

  )
}
