import React from "react";
import MapComponent from "./MapComponent";
import { useNavigate } from "react-router-dom";

export default function LastSection() {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: "#F1FFE7" }}
      className="flex flex-col md:flex-row gap-4 p-4 sm:p-6"
    >
      <div
        style={{ backgroundColor: "#C2E7DA" }}
        className="w-full md:w-1/2 text-black p-4 sm:p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-center text-2xl sm:text-3xl mb-4 font-semibold">
          About GHMC
        </h1>
        <p className="text-justify mb-4 leading-relaxed text-sm sm:text-base">
          Greater Hyderabad Municipal Corporation is a civic administrative body
          which looks after the administration of the Hyderabad city, the
          capital city of Telangana State. It was constituted in 2007 by merging
          surrounding 12 municipalities into the Municipal Corporation of
          Hyderabad, originally formed in 1955. GHMC's jurisdiction spans 4
          districts—Hyderabad, Medchal Malkajgiri, Ranga Reddy, and
          Sangareddy—covering 650 Sq. Km with 6 zones, 30 circles, and 150
          wards.
        </p>
        <button
          onClick={() => navigate("/about")}
          className="cursor-pointer border border-black py-2 px-4 sm:px-6 rounded-2xl bg-white hover:bg-gray-200 transition text-sm sm:text-base"
        >
          Read More...
        </button>
      </div>

      <div className="w-full md:w-1/2 bg-green-100 p-2 sm:p-4 rounded-2xl shadow-lg flex items-center justify-center min-h-[300px] md:min-h-0">
        <MapComponent />
      </div>
    </div>
  );
}
