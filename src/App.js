import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import WeatherSearchView from "./views/WeatherSearchView";
import GeolocationView from "./views/GeolocationView";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <Routes>
            {/* <Route path="/search" element={<WeatherSearchView />}/> */}
            <Route path="/" element={<GeolocationView />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
