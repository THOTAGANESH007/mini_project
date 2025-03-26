import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/LandingPage/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import GovRepresentives from './components/GovRepresentives';
import AllPlaces from './components/AllPlaces';
import AuthPage from './components/AuthPage';

function App() {

  return (
    <>
    <Header/>
    
      <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<></>} />
          <Route path="/contact" element={<></>} />
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/officals" element={<GovRepresentives/>} />
          <Route path="/places" element={<AllPlaces/>} />

          <Route path="/auth/*" element={<AuthPage/>} />
      </Routes>
    

    <Footer/>
    </>
  )
}

export default App
