import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Posts from './components/Posts';
import AddPost from './components/AddPost';
import Signup from './components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Link to="/">Home</Link>  {/* Home button */}
        <div>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/add-post">Add Post</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link> {/* Signup link */}
            </>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-post" element={
            isLoggedIn ? <AddPost token={token} /> : <Navigate replace to="/login" />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;