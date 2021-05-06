import React, { useState } from 'react';

import { Redirect, Link } from 'react-router-dom';

import { useAuth } from './auth';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import logo_cs from '../images/logo_cs.png';
import { host } from '../../components/host';

//import SalemState from "../"

//import { updateAppSettings } from "../util";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  salem: {
    backgroundImage: { logo_cs },
    width: '200px',

  },
  image: {
    backgroundImage:
      'url(https://images.squarespace-cdn.com/content/v1/52cb2c35e4b0e40096e744a3/1507147120791-JSX5U3YZB3PE58NXBZEI/ke17ZwdGBToddI8pDm48kK-6VZ_A-mpZPnQ1J7WFaxp7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mwD1g8DYbkhCsgrhnj8CXZYCD5bU3QvC-q6Z8ONLSlwiQbJQ0xI_XvgfUfYGy5Dpw/WR_SalemState_VikingHall_01_150dpi.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = props => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName, setAuthToken, username, setTheRole, role } = useAuth();

  const classes = useStyles();

  const onClickLogin = async () => {
    const arr = ['student', 'advisor', 'admin'];

    const headers = {
      'Content-Type': 'application/json',
    };
    let accses = false;
    for (let userStr in arr) {
      try {
        const url = `${host}${arr[userStr]}/login`;
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <Grid container justify="center" style={{ padding: 10, backgroundColor:"blue" }}>
          <img alt="logo" src={logo_cs} width={300} padding={20} backgroundColor="blue" />
        </Grid>

        <div className={classes.paper}>
          <Typography component="h1" style={{ fontWeight: 'bold', fontSize: '24px' }}>
            Sign in
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={userName}
              onChange={e => setUsername(e.target.value)}
              label="Username"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircleOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Sign In
            </Button>
            <Typography style={{ marginLeft: '43%', variant: 'outlined' }}>No Account?</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              component={Link}
              to="/schedule"
              className={classes.submit}>
              View Schedule
            </Button>

            <Grid container>
              <Grid item xs>
                <div />
              </Grid>
            </Grid>
            <Typography style={{ color: '#D53D1D', padding: 50, variant: 'outlined' }}>
              This website is for Capstone Project student of IT and CS majors
            </Typography>
          </form>
          <Typography style={{ padding: 50, variant: 'outlined' }}></Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
