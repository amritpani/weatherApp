import React, { useState, useEffect } from "react";

const SearchResultPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const searchedLocation = query.get("location");

    // Check if homeTown exists in local storage
    const homeTown = localStorage.getItem("homeTown");

    if (searchedLocation) {
      fetchLocationData(searchedLocation);
    } else if (homeTown) {
      fetchLocationData(homeTown);
    }
  }, []);

  const fetchLocationData = (location) => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=1&key=a0c4625ec11640d7b4c34407232706`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setLocationData(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Check if locationData is null and homeTown exists in local storage
    if (!locationData && localStorage.getItem("homeTown")) {
      fetchLocationData(localStorage.getItem("homeTown"));
    }
  }, [locationData]);

  return (
    <div className="result-container">
      {loading && (
        <div>
          <h2>Loading location data...</h2>
        </div>
      )}

      {!loading && locationData && (
        <div className="new-location-data">
          <h2 className="location-name">
            Location: {locationData.location.name},{" "}
            {locationData.location.region}
          </h2>
          <p>Temperature: {locationData.current.temp_c}°C</p>
          <p>Feels like: {locationData.current.feelslike_c}°C</p>
          <p>Last Updated: {locationData.current.last_updated}</p>
          <p>Humidity: {locationData.current.humidity}</p>
          {/* <p>Sunrise: {locationData.astro.sunrise}</p>
          <p>SunSet: {locationData.astro.sunset}</p> */}
        </div>
      )}

      {!loading && !locationData && (
        <div>
          <h2>No location data available.</h2>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
