<<<<<<< HEAD
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
import AboutPage from './components/AboutPage';
import EventList from './components/Events/EventList';
import EventDetail from './components/Events/EventDetail';
import ScrollToTop from './components/ScrollToTop';
=======
import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/LandingPage/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GovRepresentives from "./components/GovRepresentives";
import AllPlaces from "./components/AllPlaces";
import AuthPage from "./components/AuthPage";
import AboutPage from "./components/AboutPage";
import EventList from "./components/Events/EventList";
import EventDetail from "./components/Events/EventDetail";
import ComplaintForm from "./complaints/complaintForm";
>>>>>>> 111734cecd312fd045a56694d8fd19d8f0878bc2

function App() {
  return (
    <>
<<<<<<< HEAD
    <Header/>
    <ScrollToTop/>
      <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/contact" element={<></>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/officals" element={<GovRepresentives/>} />
          <Route path="/events" element={<EventList/>} />
          <Route path="/event/:id" element={<EventDetail/>} />
          <Route path="/places" element={<AllPlaces/>} />
          <Route path='/about' element={<AboutPage></AboutPage>} />
          <Route path="/auth/*" element={<AuthPage/>} />
      </Routes>
    
=======
      <Header />
>>>>>>> 111734cecd312fd045a56694d8fd19d8f0878bc2

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/officals" element={<GovRepresentives />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/places" element={<AllPlaces />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/complaints" element={<ComplaintForm />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
