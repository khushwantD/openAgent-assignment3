import { useState } from "react";

function WeatherDashboard() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  async function fetchWeather(city) {
    try {
         const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2dcbbbae360603ae52b5d030e0403d64`
         );
         const data = await response.json()
         return data;
    } catch (error) {
        console.log(error);
    }
   
  }

  const addCity = async () => {
    const weather = await fetchWeather(search);
    setCities([...cities, weather]);
    setSearch('')
  };

  const deleteCity = (city) => {
    setCities(cities.filter((c) => c.name !== city.name));
    console.log(cities);
  };

  const refreshCityData = async (city) => {
    const weather = await fetchWeather(city)
    const updatedCities = cities.map((c) => {
        if(c.name === city){
            c.main.temp = weather.main.temp
        }
        return c
  })
  setCities(updatedCities)  
  }

  return (
    <div className="main-container">
      <div className="search-container">
        {" "}
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
        <button className="search-btn" onClick={addCity}>
          Add City
        </button>{" "}
      </div>
      <div className="city-cards-container">
        {" "}
        {cities.map((city, index) => (
          <div key={index} className="city-card">
            <h2>{city.name}</h2>{" "}
            <p>
              <span>Temperature:</span> {city.main.temp}
            </p>{" "}
            <div className="btn-container">
              <button className="card-btn" onClick={() => deleteCity(city)}>
                Delete
              </button>{" "}
              <button
                className="card-btn"
                onClick={() => refreshCityData(city.name)}
              >
                Refresh
              </button>{" "}
            </div>
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}

export default WeatherDashboard
