import React from "react";
import { Link } from "react-router-dom";
import "../App.css"

function NavBar() {
    return (
        <nav>
            <div className="navbar">
                <div className="navbar-option">
                    <Link to="/" className="navbar-option-link">
                        Your Location
                    </Link>
                </div>
        {/*
                <div className="navbar-option">
                    <Link to="/search" className="navbar-option-link"> 
                        Weather Search
                    </Link>
                </div>
        */}
            </div>
        </nav>
    );
}

export default NavBar;