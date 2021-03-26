import React, { useState } from 'react';
import Login from './studentComponents/auth/login';
import CustomAppBar from './studentComponents/appbar/AppBar';
import PrivateRoute from './studentComponents/route_types/PrivateRoute';
import { AuthContext } from './studentComponents/auth/auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './studentComponents/homepage/Home';
import ProfilePage from './studentComponents/homepage/Profile';
import CreateTimeSlots from './adminComponents/timeslotComponents/CreateTimeslots';
import TimeList from './adminComponents/timeslotComponents/TimeslotsList';
import CreateSupervisor from './adminComponents/supervisorComponent/CreateSupervisor';
import AdvisorsList from './adminComponents/supervisorComponent/SupervisorList';
import CreateStudent from './adminComponents/studentComponent/CreateStudent';
import StudentsList from './adminComponents/studentComponent/StudentsList';
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
          <Route exact path="/timeslots/create" component={CreateTimeSlots} />
          <Route exact path="/supervisor/create" component={CreateSupervisor} />
          <Route exact path="/student/create" component={CreateStudent} />
          <Route exact path="/students" component={StudentsList} />
          <Route exact path="/supervisors" component={AdvisorsList} />
          <Route exact path="/timeslots" component={TimeList} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
