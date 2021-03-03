import React, { useEffect, useState } from 'react';

import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { useAuth } from '../auth/auth';
import fetch from '../util/studentApiFetch';

const HomePage = props => {
  const { username, role } = useAuth();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLast] = useState('');
  const res = fetch();

  useEffect(() => {
    console.log('res in home');
    console.log(res);
  });

  if (!username) {
    return <Redirect to="/login" />;
  }
  return (
    <Grid container container spacing={3}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default withRouter(HomePage);
