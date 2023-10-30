"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const EventCard = dynamic(() => import('../components/EventCard/EventCard'))
const apiKey = process.env.CONSUMER_KEY

export default function Events() {
  console.log(apiKey)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=UK&size=0&apikey=${apiKey}`

    async function fetchEvents() {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const eventList = data._embedded.events

        setEvents(
          eventList.map((ev) => ({
            name: ev.name,
            date: ev.dates.start.localDate,
            location: ev._embedded.venues[0].name,
            description: ev.pleaseNote,
            image: ev.images.find(image => image.ratio === "3_2")?.url || null
          }))
        )
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }

    fetchEvents()
  }, [apiKey])

  return (
    <div className="container mx-auto mt-10">
      <input 
      type="text" 
      placeholder="Search events..."
      // value={searchTerm}
      // onChange={functionhandler}
       />
       <label>
        SPORT EVENTS
        <input 
        type="checkbox" />
       </label>
       <label>
        CONCERTS
        <input 
        type="checkbox" />
       </label>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      ) : (
        "Loading data..."
      )}
    </div>
  );
}
