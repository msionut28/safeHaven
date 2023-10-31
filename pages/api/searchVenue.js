export default async function handler(req, res) {
  console.log("searching from searchVenue.js")
  const { query } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Google Places API request failed' });
  }
}
