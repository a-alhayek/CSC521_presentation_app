import React, { useEffect, useState } from 'react';

import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { useAuth } from '../auth/auth';
import axios from 'axios';
const HomePage = props => {
  const { username } = useAuth();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLast] = useState('');

  useEffect(() => {
    async function fetchStudent() {
      const url = `http://localhost:8080/api/student/stu/${username}`;

      try {
        const response = await axios.get(url);
      } catch (err) {
        console.log(JSON.stringify(err));
        alert(`You have entered wrong Username or password, please try again!, ${err.message}`);
      }
    }
  }, [props]);
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
