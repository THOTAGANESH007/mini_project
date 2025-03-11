import React from 'react'
import '../../style/Home.css'
import ExploreCards from './ExploreCards'
export default function Explore() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center explore-section" 
         >
        <h1 className='text-7xl font-medium text-center pt-6 exlore-heading'>ATTRACTIONS</h1>
        <h2 className='text-center text-2xl mt-1'>---worth a thousand stories---</h2>
            <div className='explore-cards'>
                <ExploreCards/>
            </div>
            <button className='mx-auto block exlore-button text-lg mb-3'>Discover here</button>
    
    </div>

  )
}
