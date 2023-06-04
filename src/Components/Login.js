import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/contacts/login', {
        user_name: email,
        password,
      })
      .then((response) => {
        console.log(response);
        const { status, error } = response.data;
        if (status === 'Success') {
          onLogin(email);
        } else {
          setError(error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('An error occurred during login');
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
}
export default Login;



