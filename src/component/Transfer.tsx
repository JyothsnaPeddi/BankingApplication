import React, { useState } from 'react';
import axios from 'axios';
import "../style/Transfer.css"; // Import CSS file for styles
import { useNavigate } from "react-router-dom";

const TransferForm: React.FC = () => {
  const [sourceAccountNumber, setSourceAccountNumber] = useState<string>('');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false); // State for success alert
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false); // State for error alert

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:9090/auth/transfer',
        {
          fromAccountNumber: sourceAccountNumber,
          toAccountNumber: destinationAccountNumber,
          amount
        }
      );

      console.log('Transfer Response:', response.data);

      if (response.status === 200) {
        setSuccessMessage('Transfer successful');
        setShowSuccessAlert(true);
        setError('');
        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/home");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError('Transfer failed');
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error performing transfer:', error);
      setError('Check Your Account Numbers and Try Again');
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <Header /> Ensure Header is rendered */}
      <div className="transfer-container">
        <h2 className="transfer-heading">Transfer Funds</h2>
        <form onSubmit={handleFormSubmit} className="form-table">
          <div className="form-row">
            <div className="form-label">
              <label htmlFor="sourceAccountNumber">Source Account Number:</label>
            </div>
            <div className="form-input">
              <input
                type="text"
                id="sourceAccountNumber"
                value={sourceAccountNumber}
                onChange={(e) => setSourceAccountNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-label">
              <label htmlFor="destinationAccountNumber">Destination Account Number:</label>
            </div>
            <div className="form-input">
              <input
                type="text"
                id="destinationAccountNumber"
                value={destinationAccountNumber}
                onChange={(e) => setDestinationAccountNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-label">
              <label htmlFor="amount">Amount:</label>
            </div>
            <div className="form-input">
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="submit-row">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </form>
        {error && showErrorAlert && (
          <div className="error-alert">
            <p className="error-message">{error}</p>
          </div>
        )}
        {showSuccessAlert && (
          <div className="success-alert">
            <p className="success-message">{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferForm;
