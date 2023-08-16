import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState(null);

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (location.trim() !== "") {
      // Save location to local storage as homeTown if it's the first search
      const homeTown = localStorage.getItem("homeTown");
      if (!homeTown) {
        localStorage.setItem("homeTown", location);
      }
      // Clear input field
      setLocation("");
      // Open the search result in a new tab
      window.open(`/search?location=${encodeURIComponent(location)}`, "_blank");
    }
  };

  useEffect(() => {
    // Check if homeTown exists in local storage
    const homeTown = localStorage.getItem("homeTown");
    if (homeTown) {
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
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setLocationData(null);
      });
  };

  return (
    <div className="search-container">
      <h2>Weather Search</h2>
      <form onSubmit={handleFormSubmit} className="input-form">
        <div className="input-div">
          {" "}
          <input
            className="location-input"
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter Location"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {locationData && (
        <div className="your-location-data">
          <h2 className="location-name">
            {locationData.location.name}, {locationData.location.region}
          </h2>
          <div className="details">
            <div className="temp">
              <p>
                Temperature: {locationData.current.temp_c}°C |{" "}
                {locationData.current.temp_f}°F
              </p>
            </div>
            <p>Feels like: {locationData.current.feelslike_c}°C</p>
            <p>Last Updated: {locationData.current.last_updated}</p>
            <p>Humidity: {locationData.current.humidity}%</p>
          </div>
        </div>
      )}

      {!locationData && localStorage.getItem("homeTown") && (
        <div>
          <h2>Location: {localStorage.getItem("homeTown")}</h2>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
