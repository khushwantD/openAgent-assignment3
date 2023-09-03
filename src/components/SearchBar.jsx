import { useState } from "react"

function SearchBar() {

    const [ value, setValue ] = useState('')
    const [ showCity,  setShowCity ] = useState(false)
    const [ cityData, setCityData ] = useState({})

    const fetchSearch = async (city) => {
        try {
         const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2dcbbbae360603ae52b5d030e0403d64`
         );
         const data = await response.json()
         setCityData(data)
         setShowCity(true)
    } catch (error) {
        console.log(error);
    }
    }

  return (
    <form className="search-container">
      <input
        type="search"
        name="searchPanel"
        placeholder="search City"
        className="searchPanel"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="search-btn" onClick={() => fetchSearch(value)}>
        Search
      </button>
    </form>
  );
}

export default SearchBar