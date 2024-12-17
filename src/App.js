import "./App.css";

import LandingPage from "./component/LandingPage.tsx";
import Register from "./component/Register.tsx";
import Login from "./component/Login.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreateAccountComponent from "./component/AccountCreation.tsx";
import NoOfAccounts from "./component/NoOfAccounts.tsx";
import Transfer from "./component/Transfer.tsx";
import Withdraw from "./component/Withdraw.tsx";
import Deposit from "./component/Deposit.tsx";
import store from "./app/store.ts";
import Home from "./component/HomePage.tsx";
import Logout from "./component/Logout.tsx";
import TotalAccounts from "./component/TotalAccounts.tsx";
import Missing from "./component/Missing.tsx";
import PrivateRoute from "./component/PrivateRoute.tsx";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage></LandingPage>} />
            <Route path="/Signup" element={<Register></Register>} />
            <Route path="/create-account" element={<CreateAccountComponent></CreateAccountComponent>} />
           
            <Route path="/login" element={<Login></Login>} />
            <Route path="/home" element={
              <PrivateRoute>
              <Home/>
              </PrivateRoute>
              } />
            <Route path="/total" element={ <PrivateRoute>
              <TotalAccounts></TotalAccounts></PrivateRoute>} 
              />
            <Route path="/accounts" element={<PrivateRoute>
              <NoOfAccounts></NoOfAccounts> </PrivateRoute>} />
            <Route path="/transfer" element={<PrivateRoute>
              <Transfer></Transfer></PrivateRoute>}  />
            <Route path="/withdraw" element={ <PrivateRoute>
              <Withdraw></Withdraw></PrivateRoute>} />
            <Route path="/deposit" element={<PrivateRoute><Deposit></Deposit></PrivateRoute>} />
            <Route path="/logout" element={<Logout></Logout>} />
            <Route path="*" element={<Missing />} />
         
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
