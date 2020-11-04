import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../owfont-regular.css"

let apiKey = "3393f6720b7a891184b9256089cba0f9";

const Weather = () => {
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    const res = await axios.get("https://extreme-ip-lookup.com/json/");
    setLocation(res.data.city);
  };

  useEffect(() => {
    const getWeather = async () => {
      getLocation();

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
        // "https://api.openweathermap.org/data/2.5/weather?q=" +
        //   location +
        //   "&appid=" +
        //   apiKey +
        //   "&units=imperial"
      );

      setWeather(Math.round(res.data.main.temp));
      setIcon(res.data.weather[0].icon);
    };

    getWeather();
    setInterval(() => getWeather(), 60000);
  }, [location]);

  const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  if (weather !== null) {
    return (
      <div className="weather">
        <h2 className="temp">
          {weather}°
        </h2>
        {/* <i className={`weather-icon ${icon}`}></i> */}
        <img className="weather-icon" src={imgURL} alt="Weather Icon" />
      </div>
    );
  }
};

export default Weather;

