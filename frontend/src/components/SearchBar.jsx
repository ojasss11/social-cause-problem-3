// components/SearchBar.jsx
import { useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import L from "leaflet";
import "leaflet-control-geocoder";

export default function SearchBar({ map }) {
  useEffect(() => {
    if (!map) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        const bbox = e.geocode.bbox;
        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest(),
        ]).addTo(map);

        map.fitBounds(poly.getBounds());
      })
      .addTo(map);

    return () => map.removeControl(geocoder); // Clean up control on unmount
  }, [map]);

  return null;
}
