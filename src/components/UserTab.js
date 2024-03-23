import React, { useState, useEffect } from 'react';

function UserTab() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatederror, setAuthenticatederror] = useState('');

  useEffect(() => {
    if (authenticated) {
      fetchUserData();
    }
  }, [authenticated]);

  const fetchUserData = async () => {
    try {       
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getuser`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' +  btoa(`${username}:${password}`),
        },
      });
      if (response.status === 401) {
        setAuthenticatederror('Unauthorized: Invalid username or password');
        console.error('Unauthorized: Invalid username or password');
        // Handle unauthorized access here (e.g., show error message)
        return;
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = () => {
    // Perform basic validation for username and password
    if (username.trim() === '' || password.trim() === '') {
      console.error('Username and password are required');
      // Handle validation error here (e.g., show error message)
      return;
    }
    setAuthenticated(true);
  };

  return (
    <div>
      {!authenticated && (
        <div>
          <h2>Login</h2>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {authenticated && (
        <div>
          <h2>User Data</h2>
          {userData ? (
            <div>
              <p>Name: {userData.results[0].name.title} {userData.results[0].name.first} {userData.results[0].name.last}</p>
              <p>Gender: {userData.results[0].gender}</p>
              <p>DOB: {userData.results[0].dob.date}</p>
              <p>Email: {userData.results[0].email}</p>
              {/* Display other user data */}
            </div>
          ) : (authenticatederror? <p>{authenticatederror}</p>:
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserTab;