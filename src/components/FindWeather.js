import axios from "axios";
import { useState, useEffect } from "react";

export async function FindWeather (props) {
    let params = {};
    const appId = "bd5e378503939ddaee76f12ad7a97608";

    console.log("find weather called");

    if (props.query) {
        console.log("param: query");
        params = {
            q: props.query,
            appid: appId,
            mode: 'json'
        }
    } else if (props.lat && props.lon) {
        console.log("params: lat and long")
        params = {
            lat: props.lat,
            lon: props.lon,
            appid: appId,
            mode: 'json'
        }
    } else {
        console.log("error with FindWeather call.");
        console.error('Error with FindWeather call.');
    }

    searchWeather();
    
    async function searchWeather() {
        if (params) {
            const apiUrl = "http://api.openweathermap.org/data/2.5/weather";
            
            const queryString = new URLSearchParams(params).toString();

            const url = apiUrl + "?" + queryString;
            console.log("search data url:", url);

            try {
                const incomingData = await axios.get(url);
                console.log(incomingData.data);
                return incomingData.data;
            } catch (error) {
                console.log("Error with FindWeather");
                throw error;
            }
        } else {
            console.error('Error with Search Weather');
            throw new Error("Error with FindWeather");
        }
    }

    return (
        searchWeather()
    );


}

export default FindWeather;
