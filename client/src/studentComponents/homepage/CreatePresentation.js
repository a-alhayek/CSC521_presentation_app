import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useAuth } from '../auth/auth';
import useFetchTimeslots from '../util/APITimeslotsFetch';
import Button from '@material-ui/core/Button';
import useFetchStudents from '../../adminComponents/studentAPI/APIStudentsFetch';
import useFetchAdvisors from '../../adminComponents/supervisorAPI/APIAdvisorsFetch';
import axios from 'axios';
const Title = styled.h1.attrs({
  className: 'h1',
})``;
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '60ch',
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

const filterAdvisors = createFilterOptions({
  matchFrom: 'start',
  stringify: option => `${option.firstName} ${option.lastName}`,
});
const filterStudents = createFilterOptions({
  matchFrom: 'start',
  stringify: option => `${option.firstName} ${option.lastName}`,
});
const filterTimeslots = createFilterOptions({
  matchFrom: 'start',
  stringify: option => `${option.start} ${option.day}`,
});
const CreatePresentation = props => {
  const [decription, setDecription] = useState('');
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState(false);
  const { advisors, loadingAdvisors } = useFetchAdvisors();
  const { timeslots, load } = useFetchTimeslots();
  const { students, loadingStudents } = useFetchStudents();
  //const [disabled, setDisabled] = useState(false);
  //slected by The student
  const [team, setTeam] = useState([]);
  const [selectedTimeslot, setSlectedTimeslot] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const { username } = useAuth();
  const titleEdit = str => {
    return str.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  };

  const onChangeSetTitle = e => {
    setTitle(titleEdit(e.target.value));
  };

  const onChangeSetDecription = e => {
    setDecription(e.target.value);
  };
  const handleGroupChange = e => setGroup(e.target.checked);
  const onChangeAdvisors = e => {
    setSelectedAdvisor(e);
  };
  const onChangeTimeslot = e => {
    setSlectedTimeslot(e);
  };
  const onChangeStudents = e => {
    setTeam(e);
  };
  const validateTitle = () => {
    if (title.length < 3) {
      alert('Project Title must be more than 3 Characters');
      return false;
    }
    return true;
  };

  const validateDecription = () => {
    if (decription.length < 50) {
      alert('Project Decription must be more than 160 Characters');
      return false;
    }
    return true;
  };
  const validateTeam = () => {
    /*   if (team.length === 0) {
      alert('Please select your team-members');
      return false;
    } */
    return true;
  };
  const validateAdvisor = () => {
    if (!selectedAdvisor) {
      alert('Please select your Project Advisor');
      return false;
    }
    return true;
  };
  const validateTimeslot = () => {
    if (!selectedTimeslot) {
      alert('Please select your Timeslot');
      return false;
    }
    return true;
  };

  const handleSubmitButton = e => {
    if (
      !validateTimeslot() ||
      !validateAdvisor() ||
      !validateTeam() ||
      !validateDecription() ||
      !validateTitle()
    ) {
      return;
    }
    if (
      !window.confirm(
        'are you sure you want to Submit Presentation?\nNote: changing your Advisor and Teammates needs a faculty permission?',
      )
    )
      return;
    createPresentation();
  };
  const createPresentation = async () => {
    const url = `http://localhost:8080/api/presentation`;
    /*  const headers = {
        'Content-Type': 'application/json',
    
        'x-auth-token': localStorage.getItem('token'),
      };
 */
    try {
      const timeslotId = selectedTimeslot._id;
      changeTimeslotStatusToTrue(timeslotId);
      const advisorId = selectedAdvisor.advisorid;
      const projectDescription = decription;
      const projectTitle = title;
      let studentsId = [];
      const confirm = false;
      studentsId.push(username);
      changeStudentStatus(username);
      for (let i = 0; i < team.length; i++) {
        studentsId.push(team[i].studentid);
        changeStudentStatus(team[i].studentid);
      }
      console.log('failed');
      const response = await axios.post(url, {
        timeslotId,
        advisorId,
        projectDescription,
        projectTitle,
        studentsId,
        confirm,
      });

      alert(`${response.data.message}`);
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
    window.location.reload();
  };
  const changeTimeslotStatusToTrue = async id => {
    const url = `http://localhost:8080/api/timeslot/statusTrue/${id}`;
    try {
      await axios.put(url, { group: false });
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
  };

  const changeStudentStatus = async id => {
    const url = `http://localhost:8080/api/student/status/${id}`;

    /*  const headers = {
        'Content-Type': 'application/json',
    
        'x-auth-token': localStorage.getItem('token'),
      };
 */
    try {
      await axios.put(url, { group });
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>Create Presentation</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography color="textPrimary">Project Title:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="project-title"
            label="Project Title"
            onChange={onChangeSetTitle}
            value={title}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography color="textPrimary">Project Decription:</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={4}
            placeholder="Project Decription"
            onChange={onChangeSetDecription}
            value={decription}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography color="textPrimary">Project Work:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox checked={group} onChange={handleGroupChange} color="primary" />}
            label={group ? 'Individual ' : 'Group'}
          />{' '}
        </Grid>
        {group ? (
          <Grid item xs={12} sm={6}>
            <Typography color="textPrimary">Select Teammates:</Typography>
          </Grid>
        ) : null}
        {group ? (
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              getOptionDisabled={x =>
                team.length >= 3 || x.studentid === username || x.signupStatus === true
              }
              limitTags={3}
              id="student-selection"
              options={students || []}
              noOptionsText="No Students"
              onChange={(e, newValue) => {
                onChangeStudents(newValue);
              }}
              loading={loadingStudents}
              getOptionLabel={option => `${option.firstName} ${option.lastName}`}
              filterOptions={filterStudents}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Select Students" variant="outlined" />
              )}
            />{' '}
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6}>
          <Typography color="textPrimary">Project Advisor:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="timeslot-selection"
            options={advisors || []}
            noOptionsText="No Advisors"
            loading={loadingAdvisors}
            onChange={(e, newValue) => {
              onChangeAdvisors(newValue);
            }}
            getOptionLabel={option => `${option.firstName} ${option.lastName}`}
            filterOptions={filterAdvisors}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select Advisor" variant="outlined" />
            )}
          />{' '}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="textPrimary">Project day and time:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="advisor-selection"
            options={timeslots || []}
            noOptionsText="No Timeslots Available"
            onChange={(e, newValue) => {
              onChangeTimeslot(newValue);
            }}
            loading={load}
            getOptionDisabled={x => x.status === true}
            getOptionLabel={option => `${option.start} ${option.day}`}
            filterOptions={filterTimeslots}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select Timeslot-time" variant="outlined" />
            )}
          />{' '}
        </Grid>
        <Grid item xs={12} sm={12}>
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" onClick={handleSubmitButton}>
              Submit
            </Button>
          </label>
        </Grid>
      </Grid>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default CreatePresentation;
