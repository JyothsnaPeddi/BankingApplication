import React, { useState } from 'react';
import axios from 'axios';
import "../style/AccountCreation.css";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const CreateAccountComponent = () => {
    const authToken = useSelector((state:any) => state.tokenLoader.token);
    const userId = useSelector((state:any) => state.tokenLoader.id);
    const username = useSelector((state:any) => state.tokenLoader.username);
    const email1 = useSelector((state:any) => state.tokenLoader.email);
    const navigate = useNavigate();

    // Use useState for managing state
    const [name, setName] = useState(username); // Initialize with username from Redux
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e:any) => {
        console.log("Starting handleSubmit function"); // Check if handleSubmit function is starting
        console.log("Username in handleSubmit:", username); // Check username before form submission
        e.preventDefault();
        if (email !== email1) {
            setError('Email does not match your registered email');
            setMessage('');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:9090/auth/${userId}/create`, {
                name: username, // Ensure name matches username from Redux
                email: email,
                balance: parseFloat(balance) || 0 // Ensure balance is sent correctly
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Add authorization header
                }
            });
            
            console.log("Response from server:", response.data); // Log server response if successful

            setMessage('Account created successfully');
            setError(''); // Clear any previous error messages
            setName(''); // Reset name after submission if needed
            setEmail('');
            setBalance('');
           
            navigate("/login");
        } catch (error) {
            setError('Error creating account');
            setMessage(''); // Clear any previous success messages
            console.error('Error:', error);
        }
    };

    console.log("Redux State:", useSelector(state => state)); // Check Redux state

    return (
        <div className="create-account-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* Balance input can be added back if needed */}
                <input
                    type="text"
                    placeholder="Balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                />
               
                <button type="submit">Create Account</button>
            </form>
            {message && <p className="success-message show">{message}</p>}
            {error && <p className="error-message show">{error}</p>}
        </div>
    );
};

export default CreateAccountComponent;


