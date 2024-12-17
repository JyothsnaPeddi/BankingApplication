// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import HelloPage from './HelloPage.tsx'; // Import the HelloPage component


// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [authenticated, setAuthenticated] = useState(false); // Add state to track authentication status

//   const handleAuthentication = (token) => {
//     dispatch(setAuthToken(token));
//     setAuthenticated(true); // Set authenticated state to true
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('your-auth-endpoint', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.ok) {
//         const token = await response.json();
//         handleAuthentication(token);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   // If authenticated, render HelloPage component
//   if (authenticated) {
//     return <HelloPage />;
//   }

//   // If not authenticated, render login form
//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSavedToken } from '../utils/tokenSlice';
import   { useNavigate }  from 'react-router-dom';
import HelloPage from './HelloPage';
 // Import the setSavedToken action

//  const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form submission from reloading the page
  
//     try {
//       const response = await fetch('http://localhost:8082/v1/sign-in', {
//         method: 'POST',
//         body: JSON.stringify({ username: email, password }), // Ensure backend expects 'username'
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         const { token, id } = await response.json();
//         dispatch(setSavedToken({
//           token: token,
//           id: id
//         })); // Adjust role as necessary
//         console.log(token);
//         console.log(id);
//         navigate('/hello'); // Navigate to the HelloPage
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
  
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };
  

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setSavedToken } from '../feature/redux/slice/tokenSlice'; // Adjust the import path
import '../css/Login.css'; // Import the CSS file for styling
import Header from './Header.tsx';
import Banking from '../assests/Banking.jpg'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate inputs
    if (email === '') {
      setEmailError('Email is empty');
      return;
    }
    if (password === '') {
      setPasswordError('Password is empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/v1/sign-in', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }), // Ensure backend expects 'username'
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { token, id } = await response.json();
        dispatch(setSavedToken({
          token: token,
          id: id
        })); // Adjust role as necessary
        console.log(token);
        console.log(id);
        navigate('/dashboard'); // Navigate to the HelloPage
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }

    } catch (error) {
      console.error('Error:', error);
      setError('Ivalid user credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
    
      <div className="login-container">
        <div className="login-image">
          <img src={Banking} alt="Login" />
          <p>Banking</p>
        </div>
        <div className="login-form-container">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
