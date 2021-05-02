import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useFetchStudent from './util/FetchStudents';
import useFetchTimeslot from './util/FetchTimeslot';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../src/studentComponents/auth/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import { host } from '../components/host';
init('user_HgcebxsjXw4RA1wXLpTow');
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
  const [note, setNote] = useState('');
  const { students, loadingStudents } = useFetchStudent(studentsIds); // find many or one student.
  const { timeslot, loadingTimeslot } = useFetchTimeslot(timeslotID); //fine timeslot and return it

  const confirmPresentation = async e => {
    e.preventDefault();
    if (!window.confirm('are you sure you want to confirm?')) return;
    const url = `${host}presentation/${presentId}`;
    try {
      await axios.put(url);
    } catch (err) {
      alert(`Error ${err.message}`);
      return;
    }
    try {
      const templateParams = {
        to_email: students[0].email,
        to_name: `${students[0].firstName}  ${students[0].lastName}`,
        message: 'Your presentation confirmed! \nGoodluck',
      };
      await emailjs.send(
        'service_q3ramr9',
        'template_g26e554', //default template
        templateParams,
        'user_HgcebxsjXw4RA1wXLpTow',
      );
      alert(`sent confirmation to ${students[0].firstName}`);
    } catch (err) {
      console.log(err);
      alert('failed to notify student');
    }

    setRedirect(true);
    alert('Thank you! Presenation Confirmed');
  };
  const noteChange = e => {
    setNote(e.target.value);
  };
  const sendNote = async e => {
    e.preventDefault();

    if (!students) {
      return;
    }
    try {
      const templateParams = {
        to_email: students[0].email,
        to_name: `${students[0].firstName}  ${students[0].lastName}`,
        message: note,
      };

      const result = await emailjs.send(
        'service_q3ramr9',
        'template_g26e554', //default template
        templateParams,
        'user_HgcebxsjXw4RA1wXLpTow',
      );
      alert('message sent');
      setNote('');
    } catch (err) {
      console.log(err);
      alert('failed to send message');
    }
  };
  if (redirect) {
    return <Redirect to="/advisor" />;
  }

  if (!username) {
    return <Redirect to="/login" />;
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
                style={{ margin: '20px' }}
                variant="contained"
                color="primary"
                disabled={confirm}
                onClick={confirmPresentation}>
                {props.confirm ? 'confirmed' : 'confirm'}
              </Button>
            </div>
            <div>
              <Typography style={{ margin: '20px' }} variant="h5" component="p">
                If you don't wanna confirm, please send a note to the student telling them why!
              </Typography>
              <TextareaAutosize
                style={{ margin: '20px' }}
                aria-label="max height"
                rowsMin={3}
                value={note}
                onChange={noteChange}
              />
            </div>
            <div>
              <Button
                style={{ margin: '20px' }}
                variant="contained"
                color="primary"
                onClick={sendNote}>
                Send note
              </Button>
            </div>
          </Grid>{' '}
        </div>
      ) : null}
    </div>
  );
};
export default StudentProfile;
