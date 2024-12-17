import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/HomePage.css";

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={`home-container ${menuVisible ? 'menu-visible' : ''}`}>
      <header className="home-header">
        <div className="blur-background"></div>
        <button className="menu-toggle-button" onClick={toggleMenu}>
         CLICK ON ME TO START TRANSACTION
        </button>
      </header>

      {menuVisible && (
        <div className="menu">
          <Link to="/accounts" className="menu-item">
            Transfer
          </Link>
          <Link to="/withdraw" className="menu-item">
            Withdraw
          </Link>
          <Link to="/deposit" className="menu-item">
            Deposit
          </Link>
          <Link to="/total" className="menu-item">
           Check Balance
          </Link>
          <Link to="/create-account" className="menu-item">
            Create Account
          </Link>
          <Link to="/logout" className="menu-item">
            Logout
          </Link>
        </div>
      )}

      <div className="bank-info">
         <h2 className="transaction-info">About Sapient Bank</h2>
         <p>This account also gives the flexibility to create your own account with simple easy steps</p>
        <p>
        Deposit Services: This Bank allows customers to deposit money into their accounts through branches, cash deposit machines (CDMs), and online transfers.
        </p>
        <p>
        Fund Transfer Services: Customers can transfer funds between their own accounts, to other all Bank accounts
        </p>
       
      </div>
    </div>
  );
};

export default Home;
