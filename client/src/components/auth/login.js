import React, { useState } from 'react';
import { Grid, Card, Typography, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from './auth';
import axios from 'axios';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles"

//import { updateAppSettings } from "../util";

export const Login = props => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName, setAuthToken, username, setTheRole, role } = useAuth();

  const onClickLogin = async () => {
    const url = `http://localhost:8080/api/student/login`;

    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post(
        url,
        { studentid: userName, password: password },
        {
          headers: headers,
        },
      );

      setAuthToken(response.data.token);
      setUserName(response.data.student.student);
      setTheRole(response.data.role);
    } catch (err) {
      console.log(JSON.stringify(err));
      alert(`You have entered wrong Username or password, please try again!, ${err.message}`);
    }
  };

  const theme = createMuiTheme({
    palette:{
      type:"dark",
    }
  });
  const submitHandler = e => {
    e.preventDefault();
    onClickLogin();
  };

  if (username) {
    return <Redirect to="/home" />;
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      direction="row"
      item
      xs={12}
      justify="center"
      alignItems="center"
      
      style={{ height: '100%' }}>
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
        style={{ padding: '60px' }}>
        <Grid container item xs={16} justify="center" direction="row">
          <Typography variant="h4" alignItems="stretch">Sign-Up Capstone</Typography>
        </Grid>
        <form onSubmit={submitHandler}>
          <Grid container item direction="column" xs={12} alignItems="stretch" style={{padding: '20px'}}>
            <TextField
              placeholder="Username"
              name="username"
              value={userName}
              onChange={e => setUsername(e.target.value)}
            />
          </Grid>
          <Grid container item direction="column" xs={12} alignItems="stretch" style ={{padding:'20px'}}>
            <TextField
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid container item direction="column" xs={12} style={{padding:'20px'}} >
            <input type="submit" value="LOGIN" />
          </Grid>
        </form>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};
export default Login;
