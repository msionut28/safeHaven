'use client'
import { useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from './components/MapComponent.jsx';
import AddReview from './reviews/page.jsx';
import styles from './home.module.css';
import StarComponent from './components/StarComponent.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';

const render = (status, markers, handleMarkerClick, center, zoom) => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Error loading the map</p>;
    case Status.SUCCESS:
      return <MapComponent markers={markers} onMarkerClick={handleMarkerClick} center={center} zoom={zoom} />;
  }
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [zoom, setZoom] = useState(10);
  const [averages, setAverages] = useState({});
  const [isUniversity, setIsUniversity] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/searchVenue?query=${query}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.predictions);

        const newCenter = {
          lat: data.location.lat,
          lng: data.location.lng,
        };
        setCenter(newCenter);
        setZoom(15);

        const newMarkers = data.predictions.map((result) => ({
          position: newCenter,
          venue: result.description,
        }));
        setMarkers(newMarkers);
      } else {
        const data = await res.json();
        setError(true);
        console.log(error);
      }
    } catch (err) {
      if(err){
        console.error(error)
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (venue) => {
    try {
      const res = await fetch(`http://localhost:4000/GetReviews?venue=${venue}`);
      const data = await res.json();
      setReviews(data.reviews);
      setAverages(data.averages);
      setIsUniversity(data.isUniversity);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSelectVenue = (venue) => {
    if (!venue) return;

    setSelectedVenue(venue.description);
    fetchReviews(venue.description);
    // Set map center to selected venue's location
    const newCenter = {
      lat: venue.geometry.location.lat,
      lng: venue.geometry.location.lng,
    };
    setCenter(newCenter);
    setZoom(15);
  };

  const onReviewSubmit = async (newReview) => {
    try {
      const res = await fetch('http://localhost:4000/AddReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();
      if (res.ok) {
        // Update local to show  new review
        setReviews((prevReviews) => [...prevReviews, data.review]);
      } else {
        // what a dj calls his son (erra error)
        console.error('Failed to submit review:', data.error);
      }
    } catch (err) {
      console.error('Failed to submit review sad face:', err);
    }
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };


  const handleMarkerClick = (marker) => {
    setSelectedVenue(marker);
    fetchReviews(marker.venue);
    // Set map center marker's location
    const newCenter = {
      lat: marker.position.lat,
      lng: marker.position.lng,
    };
    setCenter(newCenter);
    setZoom(15);
  };

  return (
    <>
      <div className={styles.container}>
        {/* <h1 >Home</h1> */}

        <div className="leftSection">
          <div className={styles.searchContainer}>
            <Label forhtml="searchbar" className="mr-2">Search for a Venue or University</Label>
            <div>
              <SearchBar id="searchbar" props={{placeholder: 'Venue or University...', buttonText: 'Search', onSearch: setQuery, onClick: handleSearch}}/>
              {/* <input
                className={styles.searchInput}
                type="text"
                placeholder="Venue or University..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                disabled={loading}
              >
                Search
              </button> */}
            </div>
            {loading && <p>Loading...</p>}
            <ul className={styles.resultsList}>
              {results.map((result) => (
                <li
                  className={styles.resultItem}
                  key={result.place_id}
                  onClick={() => handleSelectVenue(result)}
                >
                  {result.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="rightSection">
            {selectedVenue && (
              <div className={styles.reviewSection}>

                <div>
                  <span>Inclusivity: </span>
                  {averages.inclusivity
                    ? <StarComponent rating={averages.inclusivity} />
                    : 'N/A'
                  }
                </div>

                <div>
                  <span>Safety: </span>
                  {averages.safety
                    ? <StarComponent rating={averages.safety} />
                    : 'N/A'
                  }
                </div>

                {isUniversity && (
                  <>
                    <div>
                      <span>Support: </span>
                      {averages.support
                        ? <StarComponent rating={averages.support} />
                        : 'N/A'
                      }
                    </div>

                    <div>
                      <span>Community: </span>
                      {averages.community
                        ? <StarComponent rating={averages.community} />
                        : 'N/A'
                      }
                    </div>
                  </>
                )}

                <h2 className={styles.reviewTitle}>Reviews for {selectedVenue}</h2>
                <div className='justify-center m-auto'>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div className={styles.reviewItem} key={index}>
                        <p>{review.review} - Date: {formatDate(review.date)}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>

                <Button 
                className={styles.reviewButton}
                 onClick={() => setShowReviewForm(!showReviewForm)}>
                  Add Your Own Review
                </Button>
                {showReviewForm && <AddReview venue={selectedVenue} onReviewSubmit={onReviewSubmit} />}
              </div>
            )}


          </div >

          <div className={styles.mapContainer}>
            <h3>Click on a venue from the list above to see it on the map!</h3>
            <Wrapper apiKey={process.env.GOOGLE_PLACES_API_KEY} render={(status) => render(status, markers, handleMarkerClick, center, zoom)}>
              <MapComponent markers={markers} onMarkerClick={handleMarkerClick} center={center} zoom={zoom} />
            </Wrapper>
          </div>
        </div>
      </div>
    </>
  );
}