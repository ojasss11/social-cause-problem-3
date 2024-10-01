// components/ReactComponentSocket.jsx
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import MapComponent from "./MapComponent"; // Adjust the import based on your file structure

const socket = io(); // Connect to Socket.io server

const ReactComponentSocket = () => {
  const markers = useRef({});

  useEffect(() => {
    // Get user's location and send it to the server
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    // Listen for received locations
    socket.on("received-location", (data) => {
      const { id, latitude, longitude } = data;
      // Update the markers for the corresponding user
      if (markers.current[id]) {
        markers.current[id].setLatLng([latitude, longitude]);
      } else {
        markers.current[id] = { latitude, longitude }; // Store latitude and longitude
      }
    });

    // Listen for user disconnections
    socket.on("user-disconnected", (id) => {
      if (markers.current[id]) {
        delete markers.current[id]; // Remove user location
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("received-location");
      socket.off("user-disconnected");
    };
  }, []);

  return (
    <div>
      <MapComponent markers={markers.current} />
    </div>
  );
};

export default ReactComponentSocket;
