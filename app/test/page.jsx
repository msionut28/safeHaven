'use client'

import React, { useCallback, useState, useRef, useEffect } from 'react'
import L from 'leaflet'

const propertyMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const INIT_BOUNDS = [[0, 0], [638, 906]]

export default function Map() {
    const [count, setCount] = useState(0);
    const mapElementRef = useRef(null); // Use useRef to hold a reference to the map element

    useEffect(() => {
        if (mapElementRef.current) {
            const bounds = [[0, 0], [638, 906]];
            const map = L.map(mapElementRef.current, {
                crs: L.CRS.Simple,
                dragging: false,
                doubleClickZoom: false,
                touchZoom: false,
                scrollWheelZoom: false,
                boxZoom: false,
                keyboard: false,
                zoomControl: false,
                layers: [L.imageOverlay(propertyMap, bounds)], // Pass layers as an array
                center: [51.505, -0.09]
            });

            map.on('click', (clickEvent) => {
                setCount(prevCount => prevCount + 1);
                L.marker(clickEvent.latlng).addTo(map);
            });
        }
    }, []); // Empty dependency array to run this effect once when the component mounts

    return (
        <div id="mapDiv">
            <div ref={mapElementRef}></div>
            <h2>{count}</h2>
        </div>
    )
}
