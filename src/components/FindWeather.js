import axios from "axios";
import { useState, useEffect } from "react";

function FindWeather (props){
    const [weather, setWeather] = useState({});
    let params = {}
    const appId = "bd5e378503939ddaee76f12ad7a97608";

    if (props.query) {
        params = {
            q: props.query,
            appid: appId,
            mode: 'json'
        }
    } else if (props.lat && props.lon) {
        params = {
            lat: props.lat,
            lon: props.lon,
            appid: appId,
            mode: 'json'
        }
    } else {
        console.error('Error with FindWeather call.');
    }

    async function searchWeather(e) {
        if (params) {
            e.preventDefault();
            var response = await axios.get('http://api.openweathermap.org/data/2.5/weather', { params });
            setWeather([response.data]);
            console.log(response.data);
        } else {
            console.error('Error with Search Weather');
        }
    }

    searchWeather();

    return (
        {weather}
    );
}

export default FindWeather;
