import { useState } from "react";
import DisplayWeather from "./DisplayWeather.js"
import { FindWeather } from "./FindWeather.js";

function WeatherSearch(props) {
    const [weather, setWeather] = useState({});
    const [query, setQuery] = useState("");
    const [isInit, setIsInit] = useState(true);

    function handleSearchQuery(e) {
        e.preventDefault();
        setQuery(e.target.value);
    }

    async function searchWeather() {
        console.log("SearchWeather called");
        var response = await FindWeather({query: query});
        console.log(query);
        setWeather(response);
        console.log("the Weava:", response)
        setIsInit(false);
    }


    if (Object.keys(weather).length !== 0) {
        return (
            <div>
                <input value={query} onChange={handleSearchQuery} />
                <button onClick={searchWeather}>Search</button>
                <DisplayWeather weather={weather} />
            </div>

        );
    } else if (isInit){
        return (
            <div>
                <input value={query} onChange={handleSearchQuery} />
                <button onClick={searchWeather}>Search</button>
                <h3>Search for a valid city</h3>
            </div>
        );
    } else {
        return (
            <div>
                <input value={query} onChange={handleSearchQuery} />
                <button onClick={searchWeather}>Search</button>
                <h3>Invalid city name</h3>
                <h1></h1>
            </div>
        );
    }
}

export default WeatherSearch;