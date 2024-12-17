import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Welcome to the World of Smart Banking</h1>
        <div className="buttons-container">
          <button className="btn" onClick={handleLogin}>Login</button>
          <button className="btn" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
