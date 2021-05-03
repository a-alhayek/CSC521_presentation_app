import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Tabs, Tab, Button, makeStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../studentComponents/auth/auth';

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

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
  };
  const classes = useStyles();
  if (!username && role !== 'advisor') {
    return <Redirect to="/login" />;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs>
          <Tab label="YouPresent" component={Link} to="/" />
        </Tabs>
        <Tabs>
          <Tab label="Students" style={{ marginRight: 10 }} component={Link} to="/advisor" />
        </Tabs>
        <Tabs>
          <Tab
            label="Schedule"
            style={{ marginRight: 999 }}
            component={Link}
            to="/schedule/advisor"
          />
        </Tabs>
        <Button className={classes.root} onClick={() => logout()} component={Link} to="/">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
