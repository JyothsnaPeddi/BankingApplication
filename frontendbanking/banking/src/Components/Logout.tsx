import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LogoutPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear the token from local storage or redux store
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Clear the token from redux store (assuming you have an action called 'logout')
        dispatch({ type: 'LOGOUT' });
    }, [dispatch]);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="logout-container">
            <h1>Successfully logged out</h1>
            <button onClick={handleLoginRedirect} className="logout-button">
                Login
            </button>
        </div>
    );
};

export default LogoutPage;
