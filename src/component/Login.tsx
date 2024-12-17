import React, { useState } from "react";
import axios from 'axios';
import "../style/Login.css";
import { setSavedToken } from "../features/counter/counterSlice.ts";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_ENDPOINT = "http://localhost:9090/auth/generateToken"; // Replace with your backend endpoint

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username.trim() || !password.trim()) {
        setError("Username and password are required.");
        return;
      }

      const loginDetails = {
        username: username,
        password: password,
      };

      const response = await axios.post(LOGIN_ENDPOINT, loginDetails);

      console.log("Login response:", response.data);
      dispatch(
        setSavedToken({
          token: response.data.token,
          username: response.data.username,
          id: response.data.id,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
      setTimeout(() => {
        setError(""); // Clear error message after a few seconds
      }, 5000); // Adjust milliseconds as needed
    }
  };

  return (
    <div>
      <h1>Welcome to Sapient Banking! </h1>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="button"
            value="Login"
            onClick={handleSubmit}
            data-testid="login"
          />
          {error && (
            <div className="alert-message">
              <span>{error}</span>
            </div>
          )}
          <div className="signup-link">
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

