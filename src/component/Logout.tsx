// Logout.tsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../features/counter/counterSlice.ts'; // Adjust path based on your file structure
import { useNavigate } from "react-router-dom";
import "../style/Login.css"; // Import CSS file for Logout button

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      // Dispatch action to clear token from Redux store
      dispatch(clearToken());
      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;


