import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = '06c4a78708c85c1c2d654a7e892c419c';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert('City not found. Please try again.');
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city) fetchWeather();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="weather-card">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="weather-input"
        />
        <button onClick={handleSearch} className="weather-button">
          Search
        </button>
        {weather && (
          <div className="weather-info">
            <h2 className="weather-city">{weather.name}</h2>
            <p className="weather-detail">
              <strong>Temperature:</strong> {weather.main.temp}°C
            </p>
            <p className="weather-detail">
              <strong>Condition:</strong> {weather.weather[0].description}
            </p>
            <p className="weather-detail">
              <strong>Humidity:</strong> {weather.main.humidity}%
            </p>
            <p className="weather-detail">
              <strong>Wind Speed:</strong> {weather.wind.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
