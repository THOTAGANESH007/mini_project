import React from "react";
import "../../style/Home.css"; // Contains .explore-section styling
import { useNavigate } from "react-router-dom";
import ExploreCards from "./ExploreCards";

export default function Explore() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full explore-section">
      {" "}
      {/* Removed h-screen, padding already in css */}
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium text-center pt-6 exlore-heading">
        ATTRACTIONS
      </h1>
      <h2 className="text-center text-lg sm:text-xl md:text-2xl mt-1 mb-4 sm:mb-6">
        ---worth a thousand stories---
      </h2>
      <div className="explore-cards">
        {" "}
        {/* This class is just for structure, actual cards in ExploreCards */}
        <ExploreCards />
      </div>
      <button
        onClick={() => navigate("/places")}
        className="mx-auto cursor-pointer block exlore-button text-base sm:text-lg mt-4 sm:mt-0"
      >
        Discover here
      </button>
    </div>
  );
}
