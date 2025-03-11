import React from 'react'
import '../../style/Home.css'
import Events from './Events'
import Explore from './Explore'
export default function Home() {
  return (
    <div className='homePage'>
      <Events/>
      <Explore/>
    </div>
  )
}
