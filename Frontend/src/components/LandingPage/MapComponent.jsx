import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={13} className="w-full h-[400px]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[37.7749, -122.4194]}>
        <Popup>San Francisco, CA</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
