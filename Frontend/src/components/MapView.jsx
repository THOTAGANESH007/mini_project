// components/MapView.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue (this is required for proper marker rendering)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ placeName }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
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
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
     
      <div className="relative h-80">
        <MapContainer
          center={coords}
          zoom={13}
          className="h-full w-full z-0"
          style={{ position: "relative" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={coords}>
            <Popup>{placeName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  ) : (
    <p className="text-center mt-4 text-gray-500">Loading map...</p>
  );
};

export default MapView;
