import React, { useState, useEffect } from 'react';
import useFetch from '../util/APIPresentationFetch';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useAuth } from '../auth/auth';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import styled from 'styled-components';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CreatePresentation from './CreatePresentation';
import useFetchStudents from '../../adminComponents/studentAPI/APIStudentsFetch';
import useFetchAdvisors from '../../adminComponents/supervisorAPI/APIAdvisorsFetch';
import useFetchTimeslots from '../util/APITimeslotsFetch';
import DeleteButton from '../../components/buttons/DeleteButton';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../student-styles/homeStyle.css';
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
init('user_HgcebxsjXw4RA1wXLpTow');

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})``;
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
const HomePage = () => {
  const [title, setTitle] = useState('');
  const [decription, setDecription] = useState('');
  const [firstRender, setfirstRender] = useState(false);
  const [selectedTimeslot, setSlectedTimeslot] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const [team, setTeam] = useState([]);

  const { username } = useAuth();
  const { timeslots, load } = useFetchTimeslots();
  const { advisors, loadingAdvisors } = useFetchAdvisors();
  const { students, loadingStudents } = useFetchStudents();
  const { data, loading } = useFetch();

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
  const onChangeTimeslot = e => {
    setSlectedTimeslot(e);
  };
  const onChangeAdvisors = e => {
    setSelectedAdvisor(e);
  };
  const onChangeStudents = e => {
    setTeam(e);
  };
  const timeslotSearch = id => {
    for (let i = 0; i < timeslots.length; i++) {
      if (timeslots[i]._id === id) {
        return timeslots[i];
      }
    }
  };
  const advisorSearch = id => {
    for (let i = 0; i < advisors.length; i++) {
      if (advisors[i].advisorid === id) {
        return advisors[i];
      }
    }
  };
  const studentSearch = ids => {
    let arr = [];

    for (let i = 0; i < students.length; i++) {
      if (arr.length === ids.length) {
        break;
      }
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === students[i].studentid) {
          arr.push(students[i]);
          break;
        }
      }
    }

    return arr;
  };
  const validateTitle = () => {
    if (title.length < 3) {
      alert('Project Title must be more than 3 Characters');
      return false;
    }
    return true;
  };

  const validateDecription = () => {
    if (decription.length < 160) {
      alert('Project Decription must be more than 160 Characters');
      return false;
    }
    return true;
  };
  const validateTeam = () => {
    if (team.length === 0) {
      alert('Please select your team-members');
      return false;
    }

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
    console.log(team);
    if (!window.confirm('are you sure you want to Submit changes?')) return;

    if (selectedTimeslot._id !== data.timeslotId) {
      //API call to  make old timeslot available
      changeTimeslotStatusToFalse(data.timeslotId);

      //API call to make new timeslot taken const timeslotId = selectedTimeslot._id;
      changeTimeslotStatusToTrue(selectedTimeslot._id);
    }
    updatePresentation();
  };
  const updatePresentation = async () => {
    const url = `http://localhost:8080/api/presentation/stu/${data._id}`;
    const timeslotId = selectedTimeslot._id;
    const advisorId = selectedAdvisor.advisorid;
    const projectDescription = decription;
    const projectTitle = title;
    let fullName = '';
    let studentsId = [];
    for (let i = 0; i < team.length; i++) {
      studentsId.push(team[i].studentid);
    }
    for (let i = 0; i < students.length; i++) {
      if (students[i].studentid === username) {
        fullName = `${students[i].firstName} ${students[i].lastName}`;
        break;
      }
    }
    const confirm = false;
    try {
      const response = await axios.put(url, {
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
    try {
      const templateParams = {
        from_name: fullName,
        to_email: selectedAdvisor.email,
        to_name: `${selectedAdvisor.firstName}  ${selectedAdvisor.lastName}`,
        message:
          'has updated their presentation details. Please review their presentation details.',
        action: 'updated',
      };

      const result = await emailjs.send(
        'service_q3ramr9',
        'template_36bf04t', //create template
        templateParams,
        'user_HgcebxsjXw4RA1wXLpTow',
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const changeTimeslotStatusToTrue = async id => {
    const url = `http://localhost:8080/api/timeslot/statusTrue/${id}`;
    try {
      await axios.put(url);
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
  };
  const changeTimeslotStatusToFalse = async id => {
    const url = `http://localhost:8080/api/timeslot/statusFalse/${id}`;
    try {
      await axios.put(url);
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
  };
  const handleRemoveItem = async id => {
    try {
      changeTimeslotStatusToFalse(data.timeslotId);
      const url = `http://localhost:8080/api/presentation/${id}`;
      await axios.delete(url);
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
    studentRest();
  };
  const studentRest = async () => {
    try {
      for (let i = 0; i < team.length; i++) {
        const id = team[i].studentid;

        const url = `http://localhost:8080/api/student/statusrest/${id}`;
        await axios.put(url);
      }
    } catch (err) {
      alert(`${err}, bad request to the database`);
    }
    window.location.reload();
  };

  useEffect(() => {
    // Update the document title using the browser API
    if (students && timeslots && advisors && data && !firstRender) {
      setTitle(data.projectTitle);
      setDecription(data.projectDescription);
      setSlectedTimeslot(timeslotSearch(data.timeslotId));
      setSelectedAdvisor(advisorSearch(data.advisorId));
      setTeam(studentSearch(data.studentsId));
      setfirstRender(true);
    }
  });

  if (!username) {
    return <Redirect to="/login" />;
  }
  return (
    <Wrapper>
      {data || loading ? (
        <Grid container container spacing={3}>
          <Title>Update Presentation</Title>
          {!loading && !load && !loadingStudents && !loadingAdvisors ? (
            <>
              <Grid item xs={12} sm={6}></Grid>
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
                <Typography color="textPrimary">Project day and time:</Typography>
              </Grid>
              {timeslots && !load ? (
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="timeslot-selection"
                    options={timeslots || []}
                    noOptionsText="No Timeslots Available"
                    onChange={(e, newValue) => {
                      onChangeTimeslot(newValue);
                    }}
                    loading={load}
                    value={selectedTimeslot}
                    getOptionDisabled={x => x.status === true && x._id !== data.timeslotId}
                    getOptionLabel={option => `${option.start} ${option.day}`}
                    filterOptions={filterTimeslots}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField {...params} label="Select Timeslot-time" variant="outlined" />
                    )}
                  />{' '}
                </Grid>
              ) : null}
              <Grid item xs={12} sm={6}>
                <Typography color="textPrimary">Project Advisor:</Typography>
              </Grid>
              {advisors && !loadingAdvisors ? (
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="advisor-selection"
                    options={advisors || []}
                    noOptionsText="No Advisors"
                    loading={loadingAdvisors}
                    disabled={true}
                    onChange={(e, newValue) => {
                      onChangeAdvisors(newValue);
                    }}
                    getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                    filterOptions={filterAdvisors}
                    value={selectedAdvisor}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField {...params} label="Select Advisor" variant="outlined" />
                    )}
                  />{' '}
                </Grid>
              ) : null}

              <Grid item xs={12} sm={6}>
                <Typography color="textPrimary">Team:</Typography>
              </Grid>
              {students && !loadingStudents ? (
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
                    disabled={true}
                    value={team}
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
            </>
          ) : null}
          <Grid item xs={12} sm={12}>
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" onClick={handleSubmitButton}>
                Update
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} sm={12}>
            {data ? (
              <div>
                <DeleteButton
                  variant="contained"
                  id={data._id}
                  item="Presentation"
                  onDelete={handleRemoveItem}
                />
              </div>
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <CreatePresentation />
      )}
    </Wrapper>
  );
};

export default withRouter(HomePage);
