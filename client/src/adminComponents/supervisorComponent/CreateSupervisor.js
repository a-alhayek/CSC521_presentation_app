import React, { useState } from 'react';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
  textField: {
    height: '2.5ch',
  },
}));
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const CreateSupervisor = () => {
  const [advisorid, setAdvisorid] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('CS');
  const [redirect, setRedirect] = useState(null);

  const setAdvisorIdOnChange = e => setAdvisorid(e.target.value);
  const setFirstNameOnChange = e => setFirstName(e.target.value);
  const setLastNameOnChange = e => setLastName(e.target.value);
  const setEmailOnChange = e => setEmail(e.target.value);
  const setMajorOnChange = e => {
    setMajor(e.target.value);
  };
  const validateAdvisorID = () => {
    const reg = /^\d+$/;
    console.log('vID');

    if (reg.test(advisorid) && advisorid.length === 7) {
      return true;
    }
    alert('Please enter a valid advisorid! Only numbers and 7 digits');
    return false;
  };
  const validateFirstName = () => {
    const regName = /^[a-zA-Z ]+$/;

    if (regName.test(firstName)) {
      return true;
    }
    alert('Please enter a valid first name!');
    return false;
  };
  const validateLastName = () => {
    const regName = /^[a-zA-Z ]+$/;

    if (regName.test(lastName)) {
      return true;
    } else {
      alert('Please enter a valid last name!');
      return false;
    }
  };
  const validateEmail = () => {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEmail.test(email)) {
      return true;
    }
    alert('Please enter a valid email');
    return false;
  };

  const handleSubmitButton = async () => {
    if (!(validateEmail() && validateFirstName() && validateLastName() && validateAdvisorID())) {
      return;
    } else if (
      window.confirm(
        `Are you sure you want to create the following Advisor: \nAdvisorid: ${advisorid}\nFirst Name: ${firstName}\nLast Name: ${lastName},\nEmail: ${email}\nMajor: ${major}??`,
      )
    ) {
      const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
      console.log(fName);
      console.log(lName);
      const url = `http://localhost:8080/api/advisor`;
      const advisor = {
        advisorid: advisorid,
        firstName: fName,
        lastName: lName,
        email: email,
        major: major,
      };
      try {
        const response = await axios.post(url, { advisor });
        setRedirect('/supervisors');
        alert(
          `${response.data.message}, the status of the request to the database is ${response.data.success}`,
        );
      } catch (err) {
        alert(
          `${err}, the status of your request to the database is bad. This might happening because there's already a advisor with the same data.`,
        );
      }
    }
  };
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <SupervisorFields
      setAdviosrid={setAdvisorIdOnChange}
      setFirstname={setFirstNameOnChange}
      setLastname={setLastNameOnChange}
      setEmail={setEmailOnChange}
      setMajor={setMajorOnChange}
      advisorid={advisorid}
      firstname={firstName}
      lastname={lastName}
      email={email}
      major={major}
      handleSubmit={handleSubmitButton}
    />
  );
};

const SupervisorFields = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title>Create Supervisors</Title>
      <Grid container spacing={3}>
        {
          // Advisor id code block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Advisor id:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="advisorid"
              className={classes.textField}
              onChange={props.setAdviosrid}
              value={props.advisorid}
            />
          </Paper>
        </Grid>
        {
          //Advisor firstname
        }{' '}
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">First Name:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="Firstname"
              className={classes.textField}
              onChange={props.setFirstname}
              value={props.firstname}
            />
          </Paper>
        </Grid>
        {
          //Advisor lastName
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Last Name:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="LastName"
              className={classes.textField}
              onChange={props.setLastname}
              value={props.lastname}
            />
          </Paper>
        </Grid>
        {
          //Advvisor email
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Email:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="Email"
              className={classes.textField}
              onChange={props.setEmail}
              value={props.email}
            />
          </Paper>
        </Grid>
        {
          //advisor major
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Major:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={props.major}
              onChange={props.setMajor}>
              <MenuItem value="CS">CS</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
            </Select>
          </Paper>
        </Grid>
        {
          // submit button
        }
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" onClick={props.handleSubmit}>
                Submit
              </Button>
            </label>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateSupervisor;
