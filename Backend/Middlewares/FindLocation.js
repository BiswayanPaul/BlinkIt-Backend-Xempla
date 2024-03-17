const axios = require("axios");

async function getLatLng(location) {
  const encodedLocation = encodeURIComponent(location);
  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error("Location not found.");
    }
  } catch (error) {
    console.error("Error retrieving location:", error.message);
    return null;
  }
}

async function addLatLng(req, res, next) {
  const location = req.body.shipping_address;
  const fullAddress = `${location.city}, ${location.state}, ${location.country}, ${location.pincode}`;

  const latLng = await getLatLng(fullAddress);
  if (latLng) {
    req.latLng = latLng;
    next();
  } else {
    res.status(400).json({
      error:
        "Failed to retrieve latitude and longitude for the provided location.",
    });
  }
}

module.exports = addLatLng;
