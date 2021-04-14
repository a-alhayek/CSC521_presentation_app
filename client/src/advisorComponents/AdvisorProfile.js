import React from 'react';
import useFetch from './util/APIFetchAdvisor';
import { useAuth } from '../../src/studentComponents/auth/auth';
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

const AdvisorProfile = () => {
  const { username } = useAuth();

  const { data } = useFetch();

  if (!username) {
    return <Redirect to="/login" />;
  }
  return <Table advisor={data}></Table>;
};

const Table = ({ advisor }) => {
  let counter = 0;
  const classes = useStyles();

  const handleKeyChange = key => {
    if (key === 'firstName') {
      return 'First Name:';
    } else if (key === 'lastName') {
      return 'Last Name:';
    } else if (key === 'major') {
      return 'Major:';
    } else if (key === 'email') return 'Email:';
    else if (key === 'advisorid') return 'Advisor ID:';
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
        {advisor
          ? Object.keys(advisor).map(key => {
              let field = advisor[key];
              if (key === '_id' || key === 'passwordHash' || key === '__v') return null;

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

export default AdvisorProfile;
