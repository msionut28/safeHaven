"use client"

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const response = await fetch('http://localhost:4000/markers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const markersData = await response.json();
        console.log(markersData);
        setMarkers(markersData);
      } catch (error) {
        console.error('Failed to fetch markers:', error);
      }
    }

    fetchMarkers();
  }, []);

  const  handleInputSubmit = async (id) => {
    const markerText = markers.find((marker) => marker.id === id);
    console.log(`Marker ${id} text saved: ${markerText}`);

    try {
      const response = await fetch('http://localhost:4000/markers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: markerText.position,
          text: markerText.text,
        }),
      });
  
      if (response.ok) {
        console.log('Marker data saved to database:', await response.json());
      } else {
        throw new Error('Something went wrong with the POST request');
      }
    } catch (error) {
      console.error('Error saving marker:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/markers/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
       
        setMarkers(markers.filter((marker) => marker._id !== _id));
        console.log('Marker deleted from database and state:', await response.json());
      } else {
        throw new Error('Something went wrong with the DELETE request');
      }
    } catch (error) {
      console.error('Error deleting marker:', error);
    }
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
              <button onClick={() => handleDelete(marker._id)}>Delete</button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
}

export default function LeafletMap() {
  return (
    <>
{/*      <h1>Share Memory or experience</h1> */}
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
    </>
  );
}
