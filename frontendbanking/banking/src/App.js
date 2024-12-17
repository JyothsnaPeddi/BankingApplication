
import './App.css';
import { BrowserRouter  } from "react-router-dom";
// import Header from './Components/Header.tsx';
import Register from './Components/Register.tsx';
import Login from './Components/LoginPage.tsx';
import { Provider } from 'react-redux';
import store from './utils/store.js';
import HelloPage from './Components/HelloPage.tsx';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accounts from './Components/UserDashboard.tsx';
import LandingPage from './Components/Landing.tsx';
import TransferForm from './Components/TransferForm.tsx';
import WithdrawForm from './Components/WithdrawForm.tsx';
import DepositForm from './Components/DepositForm.tsx';
import GetBalanceForm from './Components/GetBalance.tsx';
import CreateAccountForm from './Components/CreateAccount.tsx';
import LogoutPage from './Components/Logout.tsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/hello" element={<HelloPage />}></Route>
          <Route path="/dashboard" element={<Accounts />}></Route>
          <Route path="/transfer/:accountId" element={<TransferForm />} />
          <Route path="/withdraw/:accountId" element={<WithdrawForm/>}/>
          <Route path="/deposit/:accountId" element={<DepositForm/>}/>
          <Route path="/getbalance/:accountId" element={<GetBalanceForm/>}/>
          <Route path="/createaccount" element={<CreateAccountForm/>}></Route>
          <Route path="/logout" element={<LogoutPage />}></Route>
      </Routes>
      </Router>
    </Provider>
  );
}

export default App;
