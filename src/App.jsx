import { useState } from "react";

import SearchLogo from "./assets/Images/icon-search.svg";
import ClearImg from "./assets/Images/clear.png";
import CloudImg from "./assets/Images/cloud.png";
import DrizzleImg from "./assets/Images/drizzle.png";
import HumidityImg from "./assets/Images/humidity.png";
import RainImg from "./assets/Images/rain.png";
import SnowImg from "./assets/Images/snow.png";
import WindImg from "./assets/Images/wind.png";
import NotFoundImg from "./assets/Images/404.png";
import "./styles.css";

function App() {
  const APIKey = "8ed10331660b95658204d030280fdfa1";

  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function fetchData() {
    if (!city) {
      setNotFound(true); // Set notFound state if the input field is empty
      setError(false); // Reset error state

      return;
    }

    setIsLoading(true);
    setError(false);
    setNotFound(false); // Reset the notFound state

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      );
      const dataAPI = await response.json();

      if (dataAPI.cod === "404") {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setData(dataAPI);
      setIsLoading(false);
      setSearchedCity(city); // Set the searched city after successful API call
    } catch (error) {
      setError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className="inner-container">
        <div className="search-container">
          <img src={SearchLogo} alt="searchLogo" className="search-img" />
          <input
            type="search"
            className="search-bar"
            placeholder="Search City"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="SearchBtn" onClick={fetchData}>
            Search
          </button>
        </div>
        <section className="city-container">
          <div className={notFound ? "not-Found" : "not-found invisible"}>
            <img
              src={NotFoundImg}
              alt="NotFoundImg"
              className="not-found-img"
            />
            <p className="error">Oops! Invalid location :</p>
          </div>

          {isLoading && <p>Loading...</p>}

          {!isLoading && !error && data && searchedCity === city && (
            <>
              <div className="weatherImg-container">
                {data.weather[0].main === "Clear" && (
                  <img src={ClearImg} alt="clear" className="weatherImages" />
                )}
                {data.weather[0].main === "Clouds" && (
                  <img src={CloudImg} alt="clouds" className="weatherImages" />
                )}
                {data.weather[0].main === "Rain" && (
                  <img src={RainImg} alt="rain" className="weatherImages" />
                )}
                {data.weather[0].main === "Snow" && (
                  <img src={SnowImg} alt="snow" className="weatherImages" />
                )}
                {data.weather[0].main === "Drizzle" && (
                  <img
                    src={DrizzleImg}
                    alt="Drizzle"
                    className="weatherImages"
                  />
                )}
              </div>

              <div className="temperature-container">
                <h2 className="fahrenheit">{parseInt(data.main.temp)}°C</h2>
              </div>

              <div className="city-name-container">
                <h3 className="city-text">{data.name}</h3>
              </div>

              <div className="flex-wind-container">
                <div className="humidity-container">
                  <img
                    src={HumidityImg}
                    alt="HumidityImg"
                    className="HumidityImg"
                  />
                  <h3 className="humidity-percent">{data.main.humidity}%</h3>
                  <p className="humidity-text">Humidity</p>
                </div>

                <div className="wind-container">
                  <img src={WindImg} alt="WindImg" className="WindImg" />
                  <h3 className="wind-km">{parseInt(data.wind.speed)}km/h</h3>
                  <p className="wind-text">Wind Speed</p>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
