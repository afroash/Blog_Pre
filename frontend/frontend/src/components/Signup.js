import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/signup', {
        email,
        username,
        password
      });
      alert('Signup successful! Please login.');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.response.data.message || 'Failed to signup');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
