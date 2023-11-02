"use client"

import React, { useState } from "react";
import styles from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/4171/4171097.png",
  iconSize: [38, 38]
});

function LocationMarkers() {
  const [markers, setMarkers] = useState([]);

  useMapEvents({
    click: (e) => {
      const newMarker = {
        id: Date.now(),
        position: e.latlng,
        text: "" 
      };
      setMarkers((markers) => [...markers, newMarker]);
    }
  });

  const handleInputChange = (e, id) => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.id === id) {
        return { ...marker, text: e.target.value };
      }
      return marker;
    });
    setMarkers(updatedMarkers);
  };

  const handleInputSubmit = (id) => {
    
    const markerText = markers.find((marker) => marker.id === id).text;
    console.log(`Marker ${id} text saved: ${markerText}`);
    
  };

  return (
    <>
      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <textarea
                value={marker.text}
                onChange={(e) => handleInputChange(e, marker.id)}
                placeholder="Enter your text here"
              />
              <button onClick={() => handleInputSubmit(marker.id)}>
                Submit
              </button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
}

export default function LeafletMap() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarkers />
    </MapContainer>
  );
}
