import React from 'react';
import useFetch from '../util/APIStudentFetch';
import { useAuth } from '../auth/auth';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
  listtext: {
    textAlign: 'center',
  },
  keylisttext: {
    textAlign: 'left',
  },
}));

const ProfilePage = () => {
  const { username, role } = useAuth();

  const { data } = useFetch();

  if (!username && role !== 'student') {
    return <Redirect to="/login" />;
  }
  return <Table student={data}></Table>;
};

const Table = ({ student }) => {
  let counter = 0;
  const classes = useStyles();

  const handleKeyChange = key => {
    if (key === 'firstName') {
      return 'First Name:';
    } else if (key === 'lastName') {
      return 'Last Name:';
    } else if (key === 'majors') {
      return 'Major:';
    } else if (key === 'email') return 'Email:';
    else if (key === 'isGroup') return 'Group Project:';
    else if (key === 'studentid') return 'Student ID:';
    else {
      return 'Sign Up Status:';
    }
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Student Profile" />
        </ListItem>
        {student
          ? Object.keys(student).map(key => {
              let field = student[key];
              if (key === '_id' || key === 'passwordHash' || key === '__v') return null;
              if (key === 'isGroup')
                field === false ? (field = 'Individual Project') : (field = 'Group Project');
              if (key === 'signupStatus')
                field === false ? (field = 'Need to Sign up') : (field = 'Signed up');

              return (
                <ListItem key={++counter}>
                  <ListItemText className={classes.keylisttext} primary={handleKeyChange(key)} />
                  <ListItemText className={classes.listtext} primary={field.toString()} />
                  {/*    <Paper className={classes.paper}> {field}</Paper> */}
                </ListItem>
              );
            })
          : null}
      </List>
    </div>
  );
};

export default ProfilePage;
