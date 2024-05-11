import React, { useState } from 'react';
import Login from './components/Login';
import Posts from './components/Posts';
import AddPost from './components/AddPost'; // Assume this component is correctly set up

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // New state to control the form display

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
    setShowLoginForm(false);  // Hide login form upon successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    
  };

  return (
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        {!isLoggedIn && (
          <button onClick={toggleLoginForm}>Login</button>
        )}
        {isLoggedIn && (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => {/* navigate to add post */}}>Add Post</button>
          </>
        )}
      </header>
      <main>
        {showLoginForm && !isLoggedIn && <Login onLogin={handleLogin} />}
        <Posts />
        {isLoggedIn && <AddPost token={token} />}
      </main>
    </div>
  );
}

export default App;
