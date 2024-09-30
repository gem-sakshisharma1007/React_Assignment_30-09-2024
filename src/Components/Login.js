import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.clear();
        localStorage.setItem('username', 'Admin');
        localStorage.setItem('password', 'Admin@123');
      }, []);  
    const handleLogin = (e) => {
      e.preventDefault();
  
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (!username && !password) {
        setError('Enter Username and Password');
        return;
      }
      else if (!password) {
        setError('Enter Password');
        return;
      } else if (!username) {
        setError('Enter Username');
        return;
      }
      
  
      if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/main');
      } else {
        setError('Invalid Username or Password');
      }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
      };
    return (
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </div>
            <div className="password-container">
              <input
                 type={passwordVisible ? 'text' : 'password'} 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
               <span onClick={togglePasswordVisibility} className="toggle-password">
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </span>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      );
    }
    

export default Login
