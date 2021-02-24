import React, { useState } from 'react';

import Login from './components/auth/login';
import { AuthContext } from './components/auth/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const existingToken = localStorage.getItem('token') || '';
  const existingUsername = localStorage.getItem('username') || '';
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);

  const setUserName = data => {
    if (!data) {
      localStorage.removeItem('username');
      setUsername();
    } else {
      localStorage.setItem('username', data);
      setUsername(data);
    }
  };

  const setToken = data => {
    if (!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', JSON.stringify(data));
      setAuthToken(data);
    }
  };

  return <Login />;
}

export default App;
