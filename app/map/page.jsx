"use client"
import React from "react";
import { useState } from "react";
import styles from "./map.module.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon} from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"


export default function Map() {
  const [markers, setMarkers] = useState([])
  const [position, setPosition] = useState(undefined)
  const [comment, setComment] = useState(undefined)
  
  function onMapClick(e) {
    setPosition(e.latlng.toString())
   }
   map.on('click', onMapClick);

  const customIcon = new Icon ({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/4171/4171097.png",
    iconSize: [38,38]
  })



  return (
    
    <div className={styles.body}>
      <div className={styles.container}>
        <MapContainer style={{
                height: '100vh',
                width: '100vw'
            }}  center={[51.505, -0.09]} zoom={13} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
          {markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}