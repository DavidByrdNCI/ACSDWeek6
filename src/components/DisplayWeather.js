function DisplayWeather(props) {
    if (props.weather && Array.isArray(props.weather.weather)) {
        return (
            <div>
                <h3>Weather Description: {props.weather.weather[0].main}</h3>
                <h3>Temperature: {props.weather.main.temp}</h3>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Error with input to DisplayWeather</h2>
                <h2>{JSON.stringify(props.weather)}</h2>
            </div>
        );
    }
}

export default DisplayWeather;

