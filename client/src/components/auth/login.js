import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from './auth';
import axios from 'axios';
//import { updateAppSettings } from "../util";
let base64 = require('base-64');
let headers = new Headers();
const url = 'http://localhost:5000/login';

export const Login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  //const { setUserName, setAuthToken, username } = useAuth();
  const history = useHistory();

  const onChangeUsername = username => setUserName(username);
  const onChangePassword = password => setPassword(password);

  const onClickLogin = () => {
    console.log('attempting login');
    const url = `http://localhost:8080/api/student/login`;

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post(
        url,
        { studentid: userName, password: password },
        {
          headers: headers,
        },
      )
      .then(res => {
        console.log(JSON.stringify(res));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    /*
    headers.set(
      "Authorization",
      "Basic " + base64.encode(userName + ":" + password)
    );
    fetch(url, { headers: headers, method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) setLoginError(json.message);
        else {
          updateAppSettings(json.token);
          history.push("/books");
        }
      })
      .catch((err) => console.log("Error logging into app ", err.message));
       */
  };

  return (
    <Grid container direction={'column'} alignItems={'center'} style={{ marginTop: '10vh' }}>
      <Grid item style={{ marginBottom: '10vh' }}>
        <Typography variant={'h3'}>
          Welcome to Presentation App!
          <span role={'img'} aria-label={'books'}>
            📚
          </span>
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: '5vh' }}>
        <TextField
          id={'username-input'}
          label={'username'}
          value={userName}
          onChange={e => onChangeUsername(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: '7vh' }}>
        <TextField
          id={'password-input'}
          label={'password'}
          type={'password'}
          value={password}
          onChange={e => onChangePassword(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: '7vh' }}>
        <Button
          aria-label={'login'}
          variant={'contained'}
          size={'large'}
          color={'secondary'}
          onClick={onClickLogin}>
          LOGIN
        </Button>
      </Grid>
      <Grid item>
        <Typography variant={'body2'} color={'error'}>
          {loginError}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Login;
