import React, { useState } from 'react';

import Login from './studentComponents/auth/login';
import CustomAppBar from './studentComponents/appbar/AppBar';
import PrivateRoute from './studentComponents/route_types/PrivateRoute';
import { AuthContext } from './studentComponents/auth/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './studentComponents/homepage/Home';

function App() {
  const existingToken = localStorage.getItem('token') || '';
  const existingUsername = localStorage.getItem('username') || '';
  const existingRole = localStorage.getItem('role') || '';
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);
  const [role, setRole] = useState(existingRole);

  const setUserName = data => {
    if (!data) {
      localStorage.removeItem('username');
      setUsername();
    } else {
      localStorage.setItem('username', data);
      setUsername(data);
    }
  };
  const setTheRole = data => {
    if (!data) {
      localStorage.removeItem('role');
      setRole();
    } else {
      localStorage.setItem('role', data);
      setRole(data);
    }
  };

  const setToken = data => {
    console.log('token');
    console.log(data);
    if (!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', data);
      setAuthToken(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: setToken,
        username,
        setUserName: setUserName,
        role,
        setTheRole: setTheRole,
      }}>
      <BrowserRouter>
        <CustomAppBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
