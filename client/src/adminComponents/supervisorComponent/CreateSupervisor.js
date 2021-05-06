import React, { useState } from 'react';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { host } from '../../components/host';
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
  label: {
    textAlign: 'right',
    clear: 'both',
    float: 'left',
    marginRight: '15px',
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

  const setAdvisorIdOnChange = e => setAdvisorid(e.target.value.trim());
  const setFirstNameOnChange = e => setFirstName(e.target.value.trim());
  const setLastNameOnChange = e => setLastName(e.target.value.trim());
  const setEmailOnChange = e => setEmail(e.target.value.trim());
  const setMajorOnChange = e => setMajor(e.target.value.trim());

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
      const url = `${host}advisor`;
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
      <Title>Create New Supervisors</Title>
      <Grid container spacing={3}>
        {
          // Advisor id code block
        }
        <form className={classes.root}>
        <div style={{ margin: 20 }}>
            <Grid item xs={12} sm={6}>
          
              <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>Advisor id:</Typography>
          
            </Grid>
            
          
              <TextField
                required
                id="standard-required"
                
                variant="outlined"
                color="secondary"
                placeholder="required"
                className={classes.textField}
                onChange={props.setAdviosrid}
                value={props.advisorid}
              />
          </div>
        
        {
          //Advisor firstname
        }{' '}
        <Grid item xs={12}>
        <div style={{ margin: 20 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>First Name:</Typography>
          
        
        
         
            <TextField
              required
              id="standard-required"
              
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setFirstname}
              value={props.firstname}
            />
          
       </div>
       </Grid>
        {
          //Advisor lastName
        }
        <Grid item xs={12}>
        <div style={{ margin: 20 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>Last Name:</Typography>
          
        
          
            <TextField
              required
              id="standard-required"
              
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setLastname}
              value={props.lastname}
            />
          
        </div>
        </Grid>
        {
          //Advvisor email
        }
        <Grid item xs={12}>
          <div style={{ margin: 20 }}>
              <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>Email:</Typography>
            
          
            
              <TextField
                required
                id="standard-required"
                
                variant="outlined"
                color="primary"
                placeholder="required"
                className={classes.textField}
                onChange={props.setEmail}
                value={props.email}
              />
            
          </div>
        </Grid>
        {
          //advisor major
        }
        
        <div style={{ margin: 20 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>Major:</Typography>
          
       
          
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={props.major}
              onChange={props.setMajor}>
              <MenuItem value="CS">CS</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
            </Select>
         
       </div>
        {
          // submit button
        }
        <Grid item xs={12} sm={12}>
          
            <label htmlFor="contained-button-file">
              <Button style={{ marginLeft: 20 }}
              variant="contained"
              color="primary" onClick={props.handleSubmit}>
                Submit
              </Button>
            </label>
          
        </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default CreateSupervisor;
