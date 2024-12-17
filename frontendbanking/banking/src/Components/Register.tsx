
import React, { useState } from 'react';
import Header from './Header.tsx';
import '../css/Register.css';

import { useNavigate } from 'react-router-dom';
import banking from '../assests/Banking.jpg'

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);

    if (!value.trim()) {
      setFirstNameError("First name is required.");
    } else if (!/^[A-Z]/.test(value)) {
      setFirstNameError("First name should start with a capital letter.");
    } else if (/\s/.test(value)) {
      setFirstNameError("First name should not contain spaces.");
    } else if (!/^[A-Za-z'-]+$/.test(value)) {
      setFirstNameError("First name contains invalid characters.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);

    if (!value.trim()) {
      setLastNameError("Last name is required.");
    } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      setLastNameError("Last name contains invalid characters.");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // const isValidDomain = (domain: string) => {
    //   const validDomains = ["gmail.com"]; // Update with actual valid domains
    //   return validDomains.includes(domain);
    // };

    if (!value.trim()) {
      setEmailError("Email is required.");
    } else if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    const phoneNumberPattern = /^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    if (!phoneNumberPattern.test(value)) {
      setPhoneNumberError("Invalid phone number format.");
    } else {
      setPhoneNumberError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(value)) {
      setPasswordError("Password must be at least 6 characters long, include a capital letter, a small letter, a number, and a special symbol.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (firstNameError || lastNameError || emailError  || phoneNumberError || passwordError || confirmPasswordError) {
      console.log("Form has errors.");
      return;
    }

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      console.log("All fields are required.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      mobileNumber: phoneNumber,
      password,
      bankAccounts: null,
    };

    try {
      const response = await fetch('http://localhost:8082/v1/addNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      console.log("Form submitted successfully.", result);

      // Navigate to another page or show a success message
      // navigate('/some-path');
      navigate('/login');
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="register-container">
      {/* <Header handleLogout={() => { /* handle logout */ }
      <div className="register-content">
        <div className="register-image">
           <img src={banking}alt="Registration" />
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            {firstNameError && <p className="error">{firstNameError}</p>}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            {lastNameError && <p className="error">{lastNameError}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
            
            {phoneNumberError && <p className="error">{phoneNumberError}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
