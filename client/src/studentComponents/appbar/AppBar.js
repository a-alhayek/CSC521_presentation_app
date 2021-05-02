import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { useAuth } from '../auth/auth';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    justifyContent: 'right',
    marginLeft: '75%',
    color: 'white',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: 10,
  },
});
const CustomAppBar = () => {
  const { setUserName, username, setAuthToken, setTheRole, role } = useAuth();

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      {username && role === 'student' ? (
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF', margin: 10 }}>
            <Typography variant="h6">YouPresent</Typography>
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: '#FFFFFF', margin: 10 }}>
            {' '}
            <Typography variant="h6">Profile</Typography>
          </Link>
          <Link
            to="/schedule/student"
            style={{ textDecoration: 'none', color: '#FFFFFF', margin: 10 }}>
            <Typography variant="h6">Schedule</Typography>
          </Link>

          <Button className={classes.root} onClick={() => logout()} component={Link} to="/">
            Logout
          </Button>
        </Toolbar>
      ) : null}
    </AppBar>
  );
};

export default CustomAppBar;
