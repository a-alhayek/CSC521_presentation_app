import React from 'react';
import { useAuth } from '../../studentComponents/auth/auth';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    //  width: "inherit",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  active: {
    background: '#ffaa80',
  },

  palette: {
    primary: {
      main: '#cc0044',
    },
  },
}));

const CustomAppBar = () => {
  const menuItems = [
    {
      text: 'schedule',
      path: '/schedule/admin',
      icon: <ScheduleIcon />,
    },
    {
      text: ' View Students',
      icon: <AccountCircleIcon color="primary" />,
      path: '/students',
    },

    {
      text: 'Create Students',
      path: '/student/create',
      icon: <AddCircleOutlineIcon style={{ color: green[500] }} />,
    },
    {
      text: 'View Timeslots',
      path: '/timeslots',
      icon: <AccountCircleIcon color="primary" />,
    },

    {
      text: 'Create Timeslots',

      path: '/timeslots/create',
      icon: <AddCircleOutlineIcon style={{ color: green[500] }} />,
    },
    {
      text: 'View Advisors',
      path: '/supervisors',
      icon: <AccountCircleIcon color="primary" />,
    },

    {
      text: 'Create Advisors',
      path: '/supervisor/create',
      icon: <AddCircleOutlineIcon style={{ color: green[500] }} />,
    },
    {
      text: 'Logout',
      path: '/',
      icon: <ExitToAppIcon style={{ color: red[500] }} />,
    },
  ];
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const [redirect, setRedirect] = useState(null);

  const { setUserName, username, setAuthToken, setTheRole, role } = useAuth();

  const logout = () => {
    setUserName();
    setAuthToken();
    setTheRole();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = path => {
    setOpen(false);
    if (path === '/') {
      logout();
    }
    history.push(path);
  };

  return (
    <div className={classes.root} style={{ marginBottom: 80 }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Administrator
          </Typography>
        </Toolbar>
      </AppBar>
      {username && role === 'admin' ? (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <Typography component="h1" style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List>
            {menuItems.map(item => (
              <ListItem
                color=""
                button
                key={item.text}
                onClick={() => handleDrawerClose(item.path)}
                className={location.pathname === item.path ? classes.active : null}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null}
    </div>
  );
};

export default CustomAppBar;
