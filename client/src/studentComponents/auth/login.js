import React, { useState } from 'react';
import { Grid, Card, Typography, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from './auth';
import axios from 'axios';
import Button from '@material-ui/core/Button';
//import { updateAppSettings } from "../util";

export const Login = props => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUserName, setAuthToken, username, setTheRole, role } = useAuth();

  const onClickLogin = async () => {
    const arr = ['student', 'advisor', 'admin'];

    const headers = {
      'Content-Type': 'application/json',
    };
    let accses = false;
    for (let userStr in arr) {
      try {
        const url = `http://localhost:8080/api/${arr[userStr]}/login`;
        const response = await axios.post(
          url,
          { studentid: userName, password: password },
          {
            headers: headers,
          },
        );

        setAuthToken(response.data.token);
        setUserName(response.data.user.user);
        setTheRole(response.data.role);
        accses = true;
        break;
      } catch (err) {
        // console.log(JSON.stringify(err));
      }
    }
    console.log(userName);
    if (!accses) {
      alert(`You have entered wrong Username or password, please try again!`);
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    onClickLogin();
  };

  if (username && role === 'student') {
    // username and role needs to be edit
    return <Redirect to="/home" />;
  }
  if (username && role === 'admin') {
    // username and role needs to be edit
    return <Redirect to="/students" />;
  }
  if (username && role === 'advisor') {
    // username and role needs to be edit
    return <Redirect to="/advisor" />;
  }

  return (
    <Grid
      container
      direction="row"
      item
      xs={12}
      justify="center"
      alignItems="center"
      style={{ height: '500px' }}>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="center"
        component={Card}
        item
        spacing={3}
        xs={8}
        md={4}
        style={{ padding: '20px' }}>
        <Grid container item xs={12} justify="center">
          <Typography variant="h5">Sign In</Typography>
        </Grid>

        <form onSubmit={submitHandler}>
          <Grid container item direction="column" xs={12} alignItems="stretch">
            <TextField
              placeholder="Username"
              name="username"
              value={userName}
              onChange={e => setUsername(e.target.value)}
            />
          </Grid>
          <Grid container item direction="column" xs={12} alignItems="stretch">
            <TextField
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid container item direction="column" xs={12}>
            <Button variant="contained" type="submit" color="primary">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
