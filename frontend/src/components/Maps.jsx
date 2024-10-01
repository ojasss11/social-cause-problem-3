// components/Map.jsx
import { useEffect, useRef } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";
import useGeolocation from "../hooks/useGeolocation";
import EmergencyButton from "./EmergencyButton";
import SearchBar from "./SearchBar"; // Import SearchBar component

export default function Map() {
  const mapRef = useRef();
  const userMarkerRef = useRef();
  const handleEmergencyButtonClick = () => {
    alert("Emergency button clicked!");
  };

  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });

  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
    "NEARBY_MARKERS",
    []
  );

  const location = useGeolocation();

  useEffect(() => {
    mapRef.current = leaflet
      .map("map")
      .setView([userPosition.latitude, userPosition.longitude], 13);

    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(mapRef.current);

    nearbyMarkers.forEach(({ latitude, longitude }) => {
      leaflet
        .marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(
          `lat: ${latitude.toFixed(2)}, long: ${longitude.toFixed(2)}`
        );
    });
  }, []);

  useEffect(() => {
    setUserPosition({ ...userPosition });

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
    }

    userMarkerRef.current = leaflet
      .marker([location.latitude, location.longitude])
      .addTo(mapRef.current)
      .bindPopup("User");

    const el = userMarkerRef.current.getElement();
    if (el) {
      el.style.filter = "hue-rotate(120deg)";
    }

    mapRef.current.setView([location.latitude, location.longitude]);
  }, [location, userPosition.latitude, userPosition.longitude]);

  return (
    <>
      <div id="map" ref={mapRef}></div>
      <SearchBar map={mapRef.current} /> {/* Include the SearchBar */}
      <EmergencyButton onClick={handleEmergencyButtonClick} />
    </>
  );
}
