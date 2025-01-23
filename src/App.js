import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location) {
      search();
    }
  }, [location]);

  const search = () => {
    if (!location) {
      alert("Please enter a location");
      setWeather(null);
      return;
    }
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`)
      .then((response) => {
        setWeather(response.data);
        setError("");
      })
      .catch(() => {
        setError("Location not found. Please try again!");
        setWeather(null);
      });
  };

  return (
    <div className="weatherApp">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter the location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" onClick={search}>
        Search
      </button>

      {error && <p className="error">{error}</p>}

      {weather && weather.main && weather.weather && (
        <div className="weatherDetails">
          <h2>Weather in {weather.name}, {weather.sys.country}</h2>
          <img
          // src="https://i.pinimg.com/736x/4c/c8/5e/4cc85ece49db5d02f313cd0378f7075a.jpg"
           src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Temperature:</strong> {weather.main.temp} °F</p>
          <p><strong>Feels Like:</strong> {weather.main.feels_like} °F</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} mph</p>
          <p><strong>Forecast:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
