import React from 'react'
import '../../style/Home.css'
import MapComponent from './MapComponent'
export default function LastSection() {
  return (
    <div className='lastSection'>
      <div className='last-left text-white text-justify'>
        <h1 className='text-center text-3xl mb-2'>About GHMC</h1>
        <p className='mb-4'>
        Greater Hyderabad Municipal Corporation is a civic administrative body which looks after the administration of the Hyderabad city which is the capital city of Telangana State. It has been constituted in the year 2007 by merging surrounding 12 municipalities into the Municipal Corporation of Hyderabad which was formed in the year 1955. The Jurisdiction of the Corporation is spread over (4) districts- Hyderabad district, part of Medchal Malkajgiri, Ranga Reddy and Sangareddy districts. At present GHMC limits extend to 650 Sq. Km with 6 zones with 30 circles which is further divided into 150 wards
        </p>
        <button className='border py-1 px-4 rounded-2xl mb-3'>Read More...</button>
      </div>
      <div className=' last-right'>
        <MapComponent/>
       

      </div>
    </div>
  )
}
