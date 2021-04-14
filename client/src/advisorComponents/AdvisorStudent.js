import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import useFetchStudent from './util/FetchStudents';
import useFetchTimeslot from './util/FetchTimeslot';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../src/studentComponents/auth/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '100%',
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
}));

const StudentProfile = props => {
  const [redirect, setRedirect] = useState(false);
  const { username } = useAuth();
  const classes = useStyles();
  const { presentId } = props.match.params;
  const { title, decrip, confirm, studentsIds, timeslotID } = props.location.state;

  const { students, loadingStudents } = useFetchStudent(studentsIds); // find many or one student.
  const { timeslot, loadingTimeslot } = useFetchTimeslot(timeslotID); //fine timeslot and return it

  const confirmPresentation = async e => {
    e.preventDefault();
    if (!window.confirm('are you sure you want to confirm?')) return;
    const url = `http://localhost:8080/api/presentation/${presentId}`;
    try {
      const response = await axios.put(url);
    } catch (err) {
      alert(`Error ${err.message}`);
      return;
    }
    setRedirect(true);
    alert('Thank you! Presenation Confirmed');
  };
  if (redirect) {
    return <Redirect to="/advisor" />;
  }

  return (
    <div className={classes.root}>
      {students ? (
        <div>
          <Title>{props.titile}</Title>
          <Grid container style={{ width: '100%' }} direction="column">
            <Grid item xs={3}>
              <Typography
                style={{ margin: '20px' }}
                color="textPrimary"
                variant="h3"
                component="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography style={{ margin: '20px' }} variant="h5" component="p">
                {decrip}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Team members:
              {students
                ? students.map(x => {
                    return (
                      <Typography key={x._id}>
                        {x.firstName} {x.lastName}
                      </Typography>
                    );
                  })
                : null}
            </Grid>
            <Grid item xs={3}>
              {timeslot ? (
                <div>
                  <Typography style={{ margin: '20px' }} variant="h5" component="p">
                    Starts at: {timeslot.start}
                  </Typography>
                  <Typography style={{ margin: '20px' }} variant="h5" component="p">
                    ends at: {timeslot.end}
                  </Typography>

                  <Typography style={{ margin: '20px' }} variant="h5" component="p">
                    Date: {timeslot.day}
                  </Typography>
                </div>
              ) : null}
            </Grid>
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={confirm}
                onClick={confirmPresentation}>
                {props.confirm ? 'confirmed' : 'confirm'}
              </Button>
            </div>
          </Grid>{' '}
        </div>
      ) : null}
    </div>
  );
};
export default StudentProfile;
