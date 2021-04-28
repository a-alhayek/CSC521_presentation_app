import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { host } from '../../components/host';

//import usePostTimeSlot from '../studentComponents/util/timeslotAPI/APITimeslotPost';

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

const CreateTimeSlots = () => {
  const [timeslotNumber, setTimeslotNumber] = useState('');
  const [timeslotDuration, setTimeslotDuration] = useState('');
  const [breakDuration, setBreakDuration] = useState('');
  const [startTime, setStartTime] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [date, setDate] = useState('');

  const setDateOnChange = eventDate => {
    if (!moment.isMoment(eventDate)) {
      alert('Please select date from the calender instead of entering it!');
      setDate();
    } else {
      setDate(eventDate.format('YYYY-MM-DD'));
    }
  };
  const setStartOnChange = time => {
    if (!moment.isMoment(time)) {
      alert('Please select time from the clock!');
      return;
    }
    setStartTime(time.format('kk:mm:ss'));
  };

  const setDurationOnChange = time => {
    if (time.target.value === '') {
      setTimeslotDuration(time.target.value);
    } else if (parseInt(time.target.value, 10).toString() === 'NaN') {
      alert('Please enter number that represent minutes for duration');
    } else {
      setTimeslotDuration(parseInt(time.target.value, 10));
    }
  };
  const setBreakDurationOnChange = time => {
    if (time.target.value === '') {
      setBreakDuration(time.target.value);
    } else if (parseInt(time.target.value, 10).toString() === 'NaN') {
      alert('Please enter number that represent minutes for duration');
    } else {
      setBreakDuration(parseInt(time.target.value, 10));
    }
  };
  const setNumberOnChange = num => {
    if (num.target.value.toString() === '') {
      setTimeslotNumber(num.target.value);
    } else if (!num.target.value.match(/^\d+$/)) {
      alert('Please enter Integer that represent how many timeslots needed');
      setTimeslotNumber('');
    } else {
      setTimeslotNumber(parseInt(num.target.value, 10));
    }
  };

  const handleSubmitButton = async () => {
    if (
      timeslotDuration === '' ||
      timeslotNumber === '' ||
      startTime === '' ||
      date === '' ||
      breakDuration === ''
    ) {
      alert('Please fill all the information in order to create Timeslots!');
    } else if (
      window.confirm(
        `Are you sure you want to create ${timeslotNumber} timeslots for ${timeslotDuration} min each timeslot starting at ${startTime} on ${date}?`,
      )
    ) {
      let start = `${date}T${startTime}`;
      let timeslots = [];

      for (let i = 0; i < timeslotNumber; i++) {
        let mS = moment(new Date(start));
        let mE = moment(new Date(start));
        if (i > 0) {
          mS.add(parseInt(breakDuration), 'm');
          mE.add(parseInt(timeslotDuration + breakDuration), 'm');
        } else mE.add(parseInt(timeslotDuration), 'm');

        start = `${date}T${mE.format('kk:mm:ss')}`;

        let timeslot = {
          start: mS.format('ddd, h:mm a'),
          end: mE.format('ddd, h:mm a'),
          day: date,
          status: false,
        };
        timeslots.push(timeslot);
      }
      const url = `${host}timeslots`;
      /*  const headers = {
        'Content-Type': 'application/json',
    
        'x-auth-token': localStorage.getItem('token'),
      };
 */
      try {
        const response = await axios.post(url, { timeslots });
        alert(
          `${response.data.message}, the status of the request to the database is ${response.data.success}`,
        );

        setRedirect('/timeslots');
      } catch (err) {
        alert(
          `${err}, the status of your request to the database is bad. This might happening because there's already a timeslot with the same time and date.`,
        );
      }
    }
  };
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <DatePickeer
      setDate={setDateOnChange}
      setStart={setStartOnChange}
      setNumber={setNumberOnChange}
      setDuration={setDurationOnChange}
      setBreakDuration={setBreakDurationOnChange}
      handleSubmit={handleSubmitButton}
      duration={timeslotDuration}
      breakDuration={breakDuration}
      quantity={timeslotNumber}
      date={date}
    />
  );
};

const DatePickeer = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>Create Timeslots</Title>
      <Grid container spacing={3}>
        {
          //time slot number code block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">How many timeslots:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="Required"
              className={classes.textField}
              onChange={props.setNumber}
              value={props.quantity}
            />
          </Paper>
        </Grid>
        {
          //duration code block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Timeslot Duration in mins:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="Required"
              className={classes.textField}
              // defaultValue={20} //  ask Bo about it
              value={props.duration}
              onChange={props.setDuration}
            />
          </Paper>
        </Grid>
        {
          // break duration code block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Break Duration between timeslots in mins:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <TextField
              required
              id="standard-required"
              label="Required"
              className={classes.textField}
              // defaultValue={20} //  ask Bo about it
              value={props.breakDuration}
              onChange={props.setBreakDuration}
            />
          </Paper>
        </Grid>
        {
          //Starting time code block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Event Starting At:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Datetime dateFormat={false} onChange={props.setStart} />
          </Paper>
        </Grid>

        {
          //date calender time block
        }
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Event Date:</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Datetime timeFormat={false} isValidDate={valid} onChange={props.setDate} />
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
//blocking days from the past && weekends
var yesterday = moment().subtract(1, 'day');
function valid(current) {
  return current.isAfter(yesterday) && current.day() !== 0 && current.day() !== 6;
}

export default CreateTimeSlots;
