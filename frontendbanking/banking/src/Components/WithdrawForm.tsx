import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/TransferForm.css'
import   { useNavigate }  from 'react-router-dom';
import Header from './Header.tsx';
interface Accounts {
    bankId: number;
    accountNumber: string;
    balance: number;
    accountTypes: string;
  }


const WithdrawForm = ()=> {
  const [amount, setAmount] = useState<number | ''>('');
  const token = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);
  const navigate = useNavigate()
  const { accountId } = useParams();
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transferData = {
        userId,
        transferAcc: accountId, // Assuming account.accountTypes is a string enum value
        amount,
      };

    try {
      const response = await fetch(`http://localhost:8082/v1/debit/${userId}/${transferData.transferAcc}/${amount}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Withdraw successful:', responseData);
        setSuccessMessage('Amount has been debited from your account.!!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/dashboard'); // Navigate to userdashboard after successful transfer
        }, 3000); // Clear success message after 3 seconds
      } else {
        console.error('Error submitting withdraw:', response.statusText);
        throw new Error('Failed to submit withdraw');
      }
    } catch (error) {
      console.error('Error submitting withdraw:', error);
    }
  };
  const handleClose = () => {
    navigate('/dashboard'); // Navigate to userdashboard when cancel button is clicked
  };

  return (
//     <div className="deposit-form-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Deposit to {accountId}</h2>
//         <label>
//           Account Number:
//           <input
//             type="text"
//             value={accountId}
//             readOnly
//           />
//         </label>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(parseFloat(e.target.value))}
//             required
//           />
//         </label>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleClose}>Cancel</button>
//       </form>
//       {successMessage && <p>{successMessage}</p>}
//     </div>
//   );
  <div>
      <Header handleLogout={() => { /* handle logout */ }} />
      <div className="form-wrapper">
        <div className="transfer-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Withdraw from {accountId}</h2>
            <label>
              Withdraw Account:
              <input
                type="text"
                value={accountId}
                readOnly
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
  
};

export default WithdrawForm;
