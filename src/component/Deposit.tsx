import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../style/Deposit.css"; // Import CSS file
import { Link, useNavigate } from "react-router-dom";
const DepositForm: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>(''); // State for account number
  const [amount, setAmount] = useState<number>(0); // State for deposit amount
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // State for error message
  const authToken = useSelector((state: any) => state.tokenLoader.token); // Fetch authToken from Redux state
  const userId = useSelector((state: any) => state.tokenLoader.id); // Fetch userId from Redux state
  const navigate = useNavigate();

  // Function to handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      setLoading(true); // Set loading to true while making the request

      const response = await axios.post(
        `http://localhost:9090/auth/${accountNumber}/deposit`, // Endpoint for deposit
        { amount }, // Request body containing amount
        {
          headers: {
            Authorization: `Bearer ${authToken}` // Include authToken in request headers
          }
        }
      );

      console.log('Deposit Response:', response.data); // Log response data to console
      setSuccessMessage('Deposit successful');
      setError('Deposit Successful'); // Clear any previous error message on successful deposit
      setTimeout(() => {
        navigate("/home");
      }, 60000);
    } catch (error) {
      console.error('Error performing deposit:', error); // Log error to console
      setError('Check Your Account Number and Try Again'); // Set error message for user display
    } finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  return (
    <div className="deposit-form-container">
      <h2>Deposit Funds</h2>
      <form className="deposit-form" onSubmit={handleFormSubmit}>
        <label>
          Account Number:
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Depositing...' : 'Deposit'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default DepositForm;
