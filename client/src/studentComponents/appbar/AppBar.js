import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Tabs, Tab, Button, makeStyles } from '@material-ui/core';
import { useAuth } from '../auth/auth';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: 10,
  },
});
const CustomAppBar = () => {
  const { setUserName, username, setAuthToken, setTheRole, role } = useAuth();
  const [value, setValue] = useState('0');

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
  };
  const onChangeValue = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      {username && role === 'student' ? (
        <Toolbar>
          <Tabs value={value} onChange={onChangeValue}>
            <Tab value="0" label="YouPresent" component={Link} to="/" />
            <Tab value="1" label="Profile" component={Link} to="/profile" />
            <Tab value="2" label="Schedule" component={Link} to="/schedule/student" />
          </Tabs>

          <Button className={classes.root} onClick={() => logout()} component={Link} to="/">
            Logout
          </Button>
        </Toolbar>
      ) : null}
    </AppBar>
  );
};

export default CustomAppBar;
