'use client'

import dynamic from "next/dynamic";
import levenshtein from "fast-levenshtein";
import { useState, useEffect } from "react";
import CheckBox from "../components/CheckBox/CheckBox";
import SearchBar from "../components/SearchBar/SearchBar";
import { useSession } from "next-auth/react";

const EventCard = dynamic(() => import('../components/EventCard/EventCard'));
const apiKey = process.env.CONSUMER_KEY;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [apiUrl, setApiUrl] = useState(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=UK&size=1&apikey=${apiKey}`);
  const [checked, setChecked] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const data = useSession()
  console.log(data);

  useEffect(() => {

    async function fetchEvents() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const eventInitialList = data._embedded.events;
        const eventList = [];
        for (const event of eventInitialList) {
          if(eventList.length < 9){
            const isUnique = !eventList.some((act) => levenshtein.get(act.name, event.name) < 8)
            if (isUnique){
              eventList.push({
                name: event.name,
                dates: event.dates.start.localDate,
                location: event._embedded.venues[0].name,
                description: event.pleaseNote,
                images: event.images.find(image => image.ratio === "3_2")?.url || null
              })
            }
          }
        } 

        setEvents(
          eventList.map((ev) => ({
            name: ev.name,
            date: ev.dates,
            location: ev.location,
            description: ev.description,
            image: ev.images
          }))
        );
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }

    fetchEvents();
  }, [apiUrl]);

  function handleCheckbox(category) {
    const newChecked = {
      sports: false,
      music: false,
      "arts&theater": false,
      family: false
    }

    newChecked[category] = true

    const newUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&classificationName=${category}&size=30&apikey=${apiKey}`
    setChecked(newChecked)
    if(checked[category] && newUrl !== apiUrl){
      setApiUrl(newUrl)
      console.log('new fetch');
    }
    else console.log(`NOT CHECKED, ${checked[category]}`);
  }

    function searchBar (searchterm) {
      setSearchTerm(searchterm)
      console.log(searchterm);
    }

    function handleSubmit () {
      const keyWord = searchTerm.split(' ').join('')
      console.log(keyWord)
      const newApiURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${keyWord}&size=30&apikey=${apiKey}`
      setApiUrl(newApiURL)
      console.log(newApiURL);
    }

  return (
    <>
      <div className="container mx-auto m-10">
        <SearchBar props={{ placeholder: 'Search event by name...', buttonText: 'SEARCH', onSearch: searchBar, onClick: handleSubmit }} />
        <div className="items-top flex space-x-2 m-5">
          <CheckBox
            id="sports"
            description="SPORTS EVENTS"
            checked={checked.sports}
            onChange={handleCheckbox}
          />
          <CheckBox
            id="music"
            description="MUSIC EVENTS"
            checked={checked.music}
            onChange={handleCheckbox}
          />
          <CheckBox
            id="arts&theater"
            description="ARTS & THEATER EVENTS"
            checked={checked['arts&theater']}
            onChange={handleCheckbox}
          />
          <CheckBox
            id="family"
            description="FAMILY EVENTS"
            checked={checked.family}
            onChange={handleCheckbox}
          />
        </div>
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
    </>
  );
}
