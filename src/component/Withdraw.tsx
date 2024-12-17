import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../style/Withdraw.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const WithdrawForm: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const authToken = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:9090/auth/${accountNumber}/withdraw`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log('Withdraw Response:', response.data);

      // Check response status or data to ensure success
      if (response.status === 200) {
        setSuccessMessage('Withdrawal successful');
        setError('');
        setTimeout(() => {
          navigate("/home");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError('Withdrawal failed');
      }

    } catch (error) {
      console.error('Error performing withdraw:', error);
      setError('Error performing withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-form-container">
      <h2>Withdraw Funds</h2>
      <form className="withdraw-form" onSubmit={handleFormSubmit}>
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
          {loading ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </form>
      {error && <div className="alert-message error">{error}</div>}
      {successMessage && <div className="alert-message success">{successMessage}</div>}
    </div>
  );
};

export default WithdrawForm;
