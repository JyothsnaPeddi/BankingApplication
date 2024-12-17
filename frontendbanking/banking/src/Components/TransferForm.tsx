// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import '../css/UserDashboard.css'; // Ensure this is included for styling
// import { useParams } from 'react-router-dom';
// interface Accounts {
//   bankId: number;
//   accountNumber: string;
//   balance: number;
//   accountTypes: string;
// }


// enum AccountTypes {
//     SAVINGS = 'SAVINGS',
//     PF = 'PF',
//     BUISNESS = 'BUISNESS',
//   }

//   const TransferForm = () => {
//     const { accountId } = useParams()
//     const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
//     const [amount, setAmount] = useState<number>(''); // Changed to `number` since it should be numeric
//     const token = useSelector((state: any) => state.tokenLoader.token); // Example of fetching token from Redux store
//     const userId = useSelector((state: any) => state.tokenLoader.id); // Example of fetching user ID from Redux store
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
  
//       const transferData = {
//         userId,
//         transferAcc: accountId, // Assuming account.accountTypes is a string enum value
//         beneficialAcc: beneficiaryAccount, // Ensure beneficiaryAccount is set correctly from state
//         amount,
//       };
    
//       try {
//         const response = await fetch(`http://localhost:8082/v1/transfer/${userId}/${transferData.transferAcc}/${transferData.beneficialAcc}/${transferData.amount}`, {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(transferData),
//         });
  
//         if (response.ok) {
//           const responseData = await response.text(); // Parse response body as JSON
//           // Handle success (e.g., show a message, update the account balance, etc.)
//           console.log('Transfer successful:', responseData);
//           handleClose(); // Close the form after successful submission
//         } else {
         
//           console.error('Error submitting transfer:', response.statusText);
        
//           throw new Error('Failed to submit transfer');
//         }
//       } catch (error) {
//         console.error('Error submitting transfer:', error);
//         // Handle error (e.g., display error message to user)
//       }
//     };
  
//     return (
//       <div className="transfer-form-container">
//         <form onSubmit={handleSubmit}>
//           <h2>Transfer from {accountId}</h2>
//           <label>
//             Transfer Account:
//             <input
//               type="text"
//               value={accountId}
//               readOnly
//             />
//           </label>
//           <label>
//             Beneficiary Account:
//             {accountId === AccountTypes.PF || accountId === AccountTypes.SAVINGS || accountId === AccountTypes.BUISNESS ? (
//               <select
//                 value={beneficiaryAccount}
//                 onChange={(e) => setBeneficiaryAccount(e.target.value)}
//                 required
//               >
//                 <option value="">Select beneficiary account</option>
//                 {Object.values(AccountTypes).filter(type => type !== accountId).map((type, index) => (
//                   <option key={index} value={type}>{type}</option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type="text"
//                 value={beneficiaryAccount}
//                 onChange={(e) => setBeneficiaryAccount(e.target.value)}
//                 required
//               />
//             )}
//           </label>
//           <label>
//             Amount:
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(parseFloat(e.target.value))}
//               required
//             />
//           </label>
//           <button type="submit">Submit</button>
//           <button type="button" onClick={handleClose}>Cancel</button>
//         </form>
//       </div>
//     );
//   };
  
//   export default TransferForm;
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import '../css/UserDashboard.css'; // Ensure this is included for styling
// import { useParams } from 'react-router-dom';

// enum AccountTypes {
//   SAVINGS = 'SAVINGS',
//   PF = 'PF',
//   BUSINESS = 'BUSINESS', // Corrected typo in enum value
// }

// const TransferForm = () => {
//   const { accountId } = useParams();
//   const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
//   const [amount, setAmount] = useState<number>(0); // Set initial amount to 0
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   const token = useSelector((state: any) => state.tokenLoader.token);
//   const userId = useSelector((state: any) => state.tokenLoader.id);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate amount
//     if (isNaN(amount) || amount <= 0) {
//       console.error('Invalid amount');
//       return;
//     }

//     const transferData = {
//       userId,
//       transferAcc: accountId,
//       beneficialAcc: beneficiaryAccount,
//       amount,
//     };

//     try {
//       const response = await fetch(`http://localhost:8082/v1/transfer/${userId}/${transferData.transferAcc}/${transferData.beneficialAcc}/${transferData.amount}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(transferData),
//       });

//       if (response.ok) {
//         const responseData = await response.text();
//         console.log('Transfer successful:', responseData);
//         setSuccessMessage('Transfer successful');
//         // Optionally, reset form fields here
//       } else {
//         console.error('Error submitting transfer:', response.statusText);
//         throw new Error('Failed to submit transfer');
//       }
//     } catch (error) {
//       console.error('Error submitting transfer:', error);
//       // Handle error (e.g., display error message to user)
//     }
//   };

//   const handleClose = () => {
//     // Logic to close the form (e.g., navigate back)
//   };

//   return (
//     <div className="transfer-form-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Transfer from {accountId}</h2>
//         <label>
//           Transfer Account:
//           <input
//             type="text"
//             value={accountId}
//             readOnly
//           />
//         </label>
//         <label>
//           Beneficiary Account:
//           {accountId === AccountTypes.PF || accountId === AccountTypes.SAVINGS || accountId === AccountTypes.BUSINESS ? (
//             <select
//               value={beneficiaryAccount}
//               onChange={(e) => setBeneficiaryAccount(e.target.value)}
//               required
//             >
//               <option value="">Select beneficiary account</option>
//               {Object.values(AccountTypes).filter(type => type !== accountId).map((type, index) => (
//                 <option key={index} value={type}>{type}</option>
//               ))}
//             </select>
//           ) : (
//             <input
//               type="text"
//               value={beneficiaryAccount}
//               onChange={(e) => setBeneficiaryAccount(e.target.value)}
//               required
//             />
//           )}
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
// };

// export default TransferForm;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import '../css/TransferForm.css'
import   { useNavigate }  from 'react-router-dom';
import Header from './Header.tsx';

enum AccountTypes {
  SAVINGS = 'SAVINGS',
  PF = 'PF',
  BUSINESS = 'BUSINESS',
}

const TransferForm = () => {
  const navigate = useNavigate()
  const { accountId } = useParams();
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const token = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid amount');
      return;
    }

    const transferData = {
      userId,
      transferAcc: accountId,
      beneficialAcc: beneficiaryAccount,
      amount,
    };

    try {
      const response = await fetch(`http://localhost:8082/v1/transfer/${userId}/${transferData.transferAcc}/${transferData.beneficialAcc}/${transferData.amount}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log('Transfer successful:', responseData);
        setSuccessMessage('Transaction Successful!!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/dashboard'); // Navigate to userdashboard after successful transfer
        }, 3000); // Clear success message after 3 seconds
      } else {
        console.error('Error submitting transfer:', response.statusText);
        throw new Error('Failed to submit transfer');
      }
    } catch (error) {
      console.error('Error submitting transfer:', error);
    }
  };

  const handleClose = () => {
    navigate('/dashboard'); // Navigate to userdashboard when cancel button is clicked
  };

  return (
    <div>
      <Header handleLogout={() => { /* handle logout */ }} />
      <div className="form-wrapper">
        <div className="transfer-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Transfer from {accountId}</h2>
            <label>
              Transfer Account:
              <input
                type="text"
                value={accountId}
                readOnly
              />
            </label>
            <label>
              Beneficiary Account:
              {accountId === AccountTypes.PF || accountId === AccountTypes.SAVINGS || accountId === AccountTypes.BUSINESS ? (
                <select
                  value={beneficiaryAccount}
                  onChange={(e) => setBeneficiaryAccount(e.target.value)}
                  required
                >
                  <option value="">Select beneficiary account</option>
                  {Object.values(AccountTypes).filter(type => type !== accountId).map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={beneficiaryAccount}
                  onChange={(e) => setBeneficiaryAccount(e.target.value)}
                  required
                />
              )}
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

export default TransferForm;

