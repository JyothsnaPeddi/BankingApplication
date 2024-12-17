import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header.tsx';
import '../css/TransferForm.css';

const GetBalanceForm = () => {
    const navigate = useNavigate();
    const { accountId } = useParams();
    const [balance, setBalance] = useState<number | null>(null);
    const token = useSelector((state: any) => state.tokenLoader.token);
    const userId = useSelector((state: any) => state.tokenLoader.id);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8082/v1/getBalance/${userId}/${accountId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Balance fetched:', responseData); // For debugging
                setBalance(responseData.toFixed(2));
            } else {
                console.error('Error fetching balance:', response.statusText);
                setErrorMessage('Failed to fetch balance');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            setErrorMessage('Error fetching balance');
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
                        <h2>Get Balance for Account {accountId}</h2>
                        <label>
                            Account ID:
                            <input
                                type="text"
                                value={accountId}
                                readOnly
                            />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleClose}>Cancel</button>
                    </form>
                    {balance !== null && <p>Balance: {balance}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default GetBalanceForm;
