import { useState, useEffect } from "react";
import axios from "axios";
import FindWeather from "./FindWeather.js";
import DisplayWeather from "./DisplayWeather.js";

function Geolocation () {
    const myApiKey = "e4a7315e0e904460b338f92191575eb1";
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [weather, setWeather] = useState({});
    const [step, setStep] = useState(0);

    let i = 0;

    useEffect(() => {
        async function fullWeather() {
            if (step === 1) {
                await getCoords();
                console.log("Function 1 called");
                setStep(2);
            } else if (step === 2) {
                getLocation();
                console.log("Function 2 called");
                setStep(0);
            }
        }
        fullWeather();
    }, [step]);

    useEffect(() => {
        setStep(1);
    })

    async function getCoords() {
        console.log("getCoords ran")
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function (pos) {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
                console.log("in getCoords:",{latitude}, {longitude});
                resolve();
            }, function (err) {
                setError("User denied geo access.");
                console.log("user deined Geo access")
                reject(err);
            }, { timeout: 100000 });
        });
    }

    async function getLocation() {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported!");
            return;
        } else {
            await getCoords();
        }

        try {
            console.log({latitude}, {longitude})
            const apiUrl = "https://api.geoapify.com/v1/geocode/reverse";
            const params = { lat: latitude, lon: longitude, apiKey: myApiKey };

            const queryString = new URLSearchParams(params).toString();

            const url = apiUrl + "?" + queryString;

            console.log("URL being queried::", url);

            const incomingData = await axios.get(url);

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

    /*

    useEffect(() => {
        async function findWeather() {
            await getLocation();
            setWeather(<FindWeather lat={latitude} lon={longitude} />);
            console.log(weather);
        }
        findWeather();
    }, []);

    useEffect(() => {
        async function findWeather() {
            await getCoords();
            i++;
            console.log(i);
            console.log("getCoords Returned");
            setLatitude(5);
            console.log("after getCoords returned:", {latitude}, {longitude});
        }

        if (latitude === 0 && longitude === 0) { // Check if coordinates are not yet obtained
            console.log(i);
            findWeather();
        }
    }, []);


    const getLocation = async function () {

        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported!");
            return;
        } else {
            await getCoords();
        }

        try {
            console.log({latitude}, {longitude})
            const apiUrl = "https://api.geoapify.com/v1/geocode/reverse";
            const params = { lat: latitude, lon: longitude, apiKey: myApiKey };

            const queryString = new URLSearchParams(params).toString();

            const url = apiUrl + "?" + queryString;

            console.log("URL being queried::", url);

            const incomingData = await axios.get(url);

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

    async function getCoords() {
        console.log("getCoords ran")
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function (pos) {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
                console.log("in getCoords:",{latitude}, {longitude});
                resolve();
            }, function (err) {
                setError("User denied geo access.");
                console.log("user deined Geo access")
                reject(err);
            });
        });
    }

    */
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

