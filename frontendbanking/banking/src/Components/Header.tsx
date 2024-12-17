import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

interface HeaderProps {
  handleLogout: () => void;
}

const Header = ({ handleLogout }: HeaderProps) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login'); // Redirect to the login page after logout
  };

  const goToProfile = () => {
    navigate('/profile'); // Redirect to the profile page
  };
  const goToCreateAccount=()=>{
    navigate('/createaccount')
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="bank-name">Bank</h1>
      </div>
      <div className="header-right">
        <button className="profile-button" onClick={goToProfile}>
          Profile
        </button>
        <button className="create-button" onClick={goToCreateAccount}>
          CreateAccount
        </button>
        
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
