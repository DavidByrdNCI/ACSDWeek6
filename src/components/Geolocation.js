import { useState, useEffect } from "react";
import axios from "axios";
import FindWeather from "./FindWeather.js";
import DisplayWeather from "./DisplayWeather.js"

function Geolocation () {
    const myApiKey = "e4a7315e0e904460b338f92191575eb1";
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [weather, setWeather] = useState({});

    useEffect(() => {
        async function findWeather() {
            await getCoords();
            await getLocation();
            setWeather(<FindWeather lat={latitude} lon={longitude} />);
            console.log(weather);
        }
        findWeather();
    }, []);

    const getCoords = async function () {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported!");
            return;
        } else {
            navigator.geolocation.getCurrentPosition(function (pos) {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
            }, function (err) {
                setError("User denied geo access.");
            });
        }
    }

    const getLocation = async function () {
        try {
            const incomingData = await axios.get("https://api.geoapify.com/v1/geocode/reverse", { params: { lat: latitude, lon: longitude, apiKey: myApiKey } });
            if (incomingData.data.features && incomingData.data.features.length > 0) {
                setCity(incomingData.data.features[0].properties.city);
                setCountry(incomingData.data.features[0].properties.country);
                console.log(incomingData.data);
            } else {
                setError("Problem with Geoapify")
            }
        } catch (error) {
            setError("Could not retrieve location. Check your API key or try again later!");
        }
    }

    if (error){
        return (
            <div>
                <h4>{error}</h4>
            </div>
        );
    } else {
        return (
            <div>
                <h1>{latitude} {longitude}</h1>
                <h2>You are currently in {city}, {country}.</h2>
                <DisplayWeather weather={weather} />
            </div>
        );
    }
}

export default Geolocation;

