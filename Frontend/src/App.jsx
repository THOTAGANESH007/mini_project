import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Header/>
    
      <Routes>
          <Route path="/" element={<></>} />
          <Route path="/about" element={<></>} />
          <Route path="/contact" element={<></>} />
      </Routes>

    <Footer/>
    </>
  )
}

export default App
