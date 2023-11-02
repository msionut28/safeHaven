export default async function handler(req, res) {
  console.log("searching from searchVenue.js")
  const { query } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`);
    const data = await response.json();

    
    if (data.predictions.length > 0) {
      const placeId = data.predictions[0].place_id;
      const detailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`);
      const detailsData = await detailsResponse.json();

      if (detailsData.result) {
        data.predictions[0].geometry = detailsData.result.geometry;
      }
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Google Places API request failed' });
  }
}
