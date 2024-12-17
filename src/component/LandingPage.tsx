import React from "react";
import "../style/LandingPage.css";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Publicis Sapient</h1>
      <div className="button-container">
        <Link to="/signup">
          <button className="register-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;