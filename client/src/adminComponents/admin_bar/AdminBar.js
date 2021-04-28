import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { useAuth } from '../../studentComponents/auth/auth';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const CustomAppBar = () => {
  const [shouldOpenMenu, setOpenMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { setUserName, username, setAuthToken, setTheRole, role } = useAuth();

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const openMenu = e => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  };

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
    closeMenu();
  };

  return (
    <AppBar position="static">
      {username && role === 'admin' ? (
        <Menu
          id="menu"
          anchorEl={menuAnchor}
          keepMounted
          open={shouldOpenMenu}
          onClose={() => closeMenu()}>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/students" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              View Students
            </Link>
          </MenuItem>

          <MenuItem onClick={() => closeMenu()}>
            <Link to="/timeslots" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              View Timeslots
            </Link>
          </MenuItem>

          <MenuItem onClick={() => closeMenu()}>
            <Link to="/supervisors" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              View Advisors
            </Link>
          </MenuItem>

          <MenuItem onClick={() => closeMenu()}>
            <Link to="/student/create" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              Create Students
            </Link>
          </MenuItem>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/timeslots/create" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              Create Timeslots
            </Link>
          </MenuItem>

          <MenuItem onClick={() => closeMenu()}>
            <Link to="/supervisor/create" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              Create Advisor
            </Link>
          </MenuItem>
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/schedule" style={{ textDecoration: 'none', color: '#000' }}>
              {' '}
              Schedule
            </Link>
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
              <ExitToAppIcon color="error" />
            </Link>
          </MenuItem>
        </Menu>
      ) : null}
      <Toolbar>
        {username ? (
          <IconButton edge="start" color="inherit" onClick={e => openMenu(e)}>
            <MoreVert />
          </IconButton>
        ) : null}
        <Link to="/" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
          <Typography variant="h6">YouPresent</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
