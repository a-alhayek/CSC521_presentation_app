import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { useAuth } from '../../studentComponents/auth/auth';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const CustomAppBar = () => {
  const { setUserName, username, setAuthToken, setTheRole, role } = useAuth();

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
          <Typography style={{ marginRight: 700 }} variant="h6">
            YouPresent
          </Typography>
        </Link>

        <MenuItem>
          <Link to="/advisor" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
            {' '}
            Students
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/schedule/advisor" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
            {' '}
            Schedule
          </Link>
        </MenuItem>

        <MenuItem onClick={() => logout()}>
          <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
            <ExitToAppIcon color="error" />
          </Link>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
