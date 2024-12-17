
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../css/UserDashboard.css';
import Header from './Header.tsx';
import TransferForm from './TransferForm.tsx';
import DepositForm from './DepositForm.tsx';
import WithdrawForm from './WithdrawForm.tsx';
import { useNavigate } from 'react-router-dom';

interface Accounts {
  bankId: number;
  accountNumber: string;
  balance: number;
  accountTypes: string;
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState<{ [key: number]: boolean }>({});
  const [showWithdrawForm, setShowWithdrawForm] = useState<{ [key: number]: boolean }>({});
  const [selectedAccount, setSelectedAccount] = useState<Accounts | null>(null);
  const [message, setMessage] = useState('');
  const token = useSelector((state: any) => state.tokenLoader.token);
  const userId = useSelector((state: any) => state.tokenLoader.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:8082/v1/getAllAccounts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const data = await response.json();
        // setAccounts(data);
        if (response.status === 404) {
            setMessage('Please create a new account to get started..');
        } else if (response.ok) {
            const data = await response.json();
            setAccounts(data);
        } else {
            const errorData = await response.text();
            setMessage(`Error: ${errorData}`);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token && userId) {
      fetchAccounts();
    }
  }, [token, userId]);

  const handleTransferClick = (account: Accounts) => {
    setSelectedAccount(account);
    navigate(`/transfer/${account.accountTypes}`); // Navigate to TransferForm
  };

  const handleDepositClick = (account: Accounts) => {
    navigate(`/deposit/${account.accountTypes}`); // Navigate to DepositForm
  };

  const handleWithdrawClick = (account: Accounts) => {
    navigate(`/withdraw/${account.accountTypes}`); // Navigate to WithdrawForm
  };
  const handleCheckBalanceClick=(account:Accounts)=>{
    navigate(`/getbalance/${account.accountTypes}`)
  }
  const goToCreateAccount=()=>{
    navigate('/createaccount')
  }


  return (
    <div>
      <Header handleLogout={() => { /* handle logout */ }} />
      <div className="accounts-container">
      {message && (
          <div className='msg-container'><p>{message}<br/>
          <button className="createaccount-button" onClick={goToCreateAccount}>
          CreateAccount
        </button></p>
          
          </div>
        )}
        {accounts.map((account) => (
          <div key={account.bankId} className="account-container">
            <h2>{account.accountTypes}</h2>
            <p>Account Number: {account.accountNumber}</p>
    
            <div className="button-container">
              <div className="button-row">
                <button className="withdraw-button" onClick={() => handleWithdrawClick(account)}>Withdraw</button>
                <button className="deposit-button" onClick={() => handleDepositClick(account)}>Deposit</button>
              </div>
              <div className="button-row">
                <button className="check-balance-button" onClick={() => handleCheckBalanceClick(account)}>Check Balance</button>
                <button className="transfer-button" onClick={() => handleTransferClick(account)}>Transfer</button>
              </div>
            </div>
            
            
          </div>
        ))}
      </div>
      
    </div>
  );
};  

export default Accounts;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
//  // Import useNavigate
// import Header from './Header.tsx';

// interface Accounts {
//   bankId: number;
//   accountNumber: string;
//   balance: number;
//   accountTypes: string;
// }

// const Accounts = () => {
//   const [accounts, setAccounts] = useState<Accounts[]>([]);
//   const [selectedAccount, setSelectedAccount] = useState<Accounts | null>(null);
//   const token = useSelector((state: any) => state.tokenLoader.token);
//   const userId = useSelector((state: any) => state.tokenLoader.id);
//   const navigate = useNavigate(); // Initialize navigate hook

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await fetch(`http://localhost:8082/v1/getAllAccounts/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         setAccounts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (token && userId) {
//       fetchAccounts();
//     }
//   }, [token, userId]);

  
//   return (
//     <div>
//       <Header handleLogout={() => { /* handle logout */ }} />
//       <div className="accounts-container">
//         {accounts.map((account) => (
//           <div key={account.bankId} className="account-container">
//             <h2>{account.accountTypes}</h2>
//             <p>Account Number: {account.accountNumber}</p>
//             <div className="button-container">
//               <div className="button-row">
//                 <button className="withdraw-button" onClick={() => handleWithdrawClick(account)}>Withdraw</button>
//                 <button className="deposit-button" onClick={() => handleDepositClick(account)}>Deposit</button>
//               </div>
//               <div className="button-row">
//                 <button className="check-balance-button" onClick={() => handleCheckBalanceClick(account)}>Check Balance</button>
//                 <button className="transfer-button" onClick={() => handleTransferClick(account)}>Transfer</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// };  

// export default Accounts;
