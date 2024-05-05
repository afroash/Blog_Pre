import React, { useState } from 'react';
import Login from './components/login';
import Posts from './components/Posts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);  // Save token to local storage
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)}>Login</button>  // Temporarily set true for navigation
        )}
      </header>
      <main>
        <Posts />
        {isLoggedIn && <Login onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;
