import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../style/NoOfAccounts.css"; // Import the CSS file with styles defined above

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>(''); // State to track the selected account ID

  const authToken = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);

        if (!authToken) {
          throw new Error('No authToken found');
        }

        const response = await axios.get<any[]>(`http://localhost:9090/auth/${userId}/accounts`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        console.log('Response data:', response.data);

        setAccounts(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setError('Error fetching accounts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (userId && authToken) {
      fetchAccounts();
    }
  }, [userId, authToken]);

  const handleCheckboxChange = (accountId: string) => {
    setSelectedAccountId(accountId);
    console.log('Selected Account ID:', accountId);
  };

  return (
    <div className="account-list-container">
      <h2>Savings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && accounts.length === 0 && !error && <p>No accounts found.</p>}
      <div className="account-boxes">
        {accounts.map(account => (
          <div key={account.id} className="account-box">
            <div className="account-details">
              <input
                type="checkbox"
                checked={account.id === selectedAccountId}
                onChange={() => handleCheckboxChange(account.id)}
              />
              <strong>Account Number:</strong> {account.accountNumber}<br />
              <strong>Name:</strong> {account.user.name}<br />
              <strong>Email:</strong> {account.user.email}<br />
              <strong>Balance:</strong> {account.balance}
            </div>
          </div>
        ))}
      </div>
      {selectedAccountId && (
        <div className="action-links">
          <Link to={`/transfer?accountId=${selectedAccountId}`} className="action-link">Transfer</Link>
          <Link to={`/withdraw?accountId=${selectedAccountId}`} className="action-link">Withdraw</Link>
          <Link to={`/deposit?accountId=${selectedAccountId}`} className="action-link">Deposit</Link>
        </div>
      )}
    </div>
  );
};

export default AccountList;

