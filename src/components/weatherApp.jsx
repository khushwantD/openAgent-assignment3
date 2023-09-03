import { useState, useEffect } from "react";

function WeatherDashboard() {
  const [cities, setCities] = useState([]);
  // const [ cardsPerPage, setCardsPerPage ] = useEffect([])
  const [search, setSearch] = useState("");
  // const [ page, setPage ] = useState(1)
  const [ isSIUnit, setIsSIUnit ] = useState(true)

  // useEffect(() => {
  //   let skip = (page - 1) * 5;
  //   const cards = cities.slice(skip, (skip + 5))
  //   setCardsPerPage(cards)
  // }, [page])

  const handleTempUnit = () => {
    setIsSIUnit(!isSIUnit)
  }

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

  const addCity = async (e) => {
    e.preventDefault()

      const weather = await fetchWeather(search);
      setCities([...cities, weather]);
      setSearch("");
    
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
    <>
      <div className="main-container">
        <form className="search-container" onSubmit={addCity}>
          {" "}
          <input
            required
            className="search-bar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
          <button type="submit" className="search-btn">
            Add City
          </button>{" "}
        </form>
        
          <div className="city-cards-container">
            {" "}
            {cities.map((city, index) => {
              
              return (
              <div key={index} className="city-card">
                <h2>{city.name}</h2>{" "}
                <h4>{city.sys.country}</h4>
                <div className="temp">
                  <p>
                    <span>Temperature:</span>{" "}
                    {isSIUnit
                      ? `${(city.main.temp - 273.1).toFixed(2)}° C`
                      : `${((city.main.temp - 273.1) * 1.8 + 32).toFixed(
                          2
                        )}° F`}
                  </p>{" "}
                  <button className="temp-btn" onClick={handleTempUnit}>
                    {isSIUnit ? "Fahrenheit" : "Celsius"}
                  </button>
                </div>
                <p><span>longitude: </span>{city.coord.lon}</p>
                <p><span>latitude: </span>{city.coord.lat}</p>
                <p><span>visibility: </span>{city.visibility}</p>
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
            )})}{" "}
          </div>
      </div>
    </>
  );
}

export default WeatherDashboard
