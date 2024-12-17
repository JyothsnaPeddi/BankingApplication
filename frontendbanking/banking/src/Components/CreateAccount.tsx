import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import '../css/TransferForm.css';

const AccountTypes = {
  SAVINGS: 'SAVINGS',
  PF: 'PF',
  BUISNESS: 'BUSINESS',
  
  // Add more account types as necessary
};

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<string>('');
  const token = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8082/v1/create-account/${userId}/${accountType}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          accountTypes: accountType,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Account created successfully:', responseData);
        navigate('/dashboard'); // Navigate to user dashboard after successful creation
      } else {
        const errorData = await response.text();
        console.error('Error creating account:', errorData);
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage('Error creating account');
    }
  };

  const handleClose = () => {
    navigate('/dashboard'); // Navigate to user dashboard when cancel button is clicked
  };

  return (
    <div>
      <Header handleLogout={() => { /* handle logout */ }} />
      <div className="form-wrapper">
        <div className="transfer-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Create New Account</h2>
            <label>
              Account Type:
              <select value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
                <option value="">Select account type</option>
                {Object.keys(AccountTypes).map((type) => (
                  <option key={type} value={type}>
                    {AccountTypes[type as keyof typeof AccountTypes]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Create Account</button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
