// components/MapView.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icons


const MapView = ({ placeName }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: placeName,
            format: "json",
            limit: 1,
          },
        });

        if (res.data && res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Failed to fetch coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [placeName]);

  return coords ? (
    <MapContainer center={coords} zoom={13} className="h-80 w-full rounded-lg shadow-md">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={coords}>
        <Popup>{placeName}</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p className="text-center mt-4 text-gray-500">Loading map...</p>
  );
};

export default MapView;
