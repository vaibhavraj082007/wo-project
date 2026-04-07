import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ isSignup = false }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  
  const handleSignUp = (users, emailKey) => {
    if (users[emailKey]) {
      setErrorMsg('This email has already been used. Please log in or use a different email.');
      return;
    } 
    
    // Create new profile
    users[emailKey] = { password, role: 'student' };
    localStorage.setItem('eduquest_users', JSON.stringify(users));
    localStorage.setItem('eduquest_active_user', emailKey);
    navigate('/student-onboarding');
  };

  const handleLogin = (users, emailKey) => {
    if (!users[emailKey]) {
      setErrorMsg('Account not found. Please sign up first.');
      return;
    }
    
    if (users[emailKey].password !== password) {
      setErrorMsg('Incorrect password.');
      return;
    }
    
    // Start session
    localStorage.setItem('eduquest_active_user', emailKey);
    navigate('/dashboard'); 
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const emailKey = username.toLowerCase();

    // Special hardcoded Parent login
    if (emailKey === 'vaibhavtripathi589@gmail.com' && password === '123') {
      navigate('/parents');
      return;
    }

    // Load database
    const usersStr = localStorage.getItem('eduquest_users');
    const users = usersStr ? JSON.parse(usersStr) : {};

    // Direct to the correct flow
    if (isSignup) {
      handleSignUp(users, emailKey);
    } else {
      handleLogin(users, emailKey);
    }
  };

  return (
    <div className="auth-page animate-enter">
      <div className="game-card card-white auth-card">
        <h2 className="auth-title">{isSignup ? 'Create Profile' : 'Log in'}</h2>
        
        {errorMsg && <div className="auth-error-msg">{errorMsg}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Username or Email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="auth-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button className="btn btn-primary btn-full" type="submit">
            {isSignup ? 'CREATE ACCOUNT' : 'LOG IN'}
          </button>
        </form>

        <div className="auth-footer">
          {isSignup ? (
            <p>Already have an account? <Link to="/login">LOG IN</Link></p>
          ) : (
            <p>Don't have an account? <Link to="/signup">SIGN UP</Link></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
