import React from 'react';

import { withRouter, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useAuth } from '../auth/auth';

const HomePage = props => {
  const { username } = useAuth();

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
