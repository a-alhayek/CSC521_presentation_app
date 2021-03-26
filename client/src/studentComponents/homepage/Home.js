import React, { useState, useEffect } from 'react';
import useFetch from '../util/APIPresentationFetch';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useAuth } from '../auth/auth';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import styled from 'styled-components';
import CreatePresentation from './CreatePresentation';
import useFetchStudents from '../../adminComponents/studentAPI/APIStudentsFetch';
import useFetchAdvisors from '../../adminComponents/supervisorAPI/APIAdvisorsFetch';
import useFetchTimeslots from '../util/APITimeslotsFetch';
import '../student-styles/homeStyle.css';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const HomePage = props => {
  const { username } = useAuth();
  const { data, loading } = useFetch();

  useEffect(() => {
    // Update the document title using the browser API
    console.log(data);
  });

  if (!username) {
    return <Redirect to="/login" />;
  }
  return (
    <Wrapper>
      {data || loading ? (
        <Grid container container spacing={3}>
          <Title>Update Presentation</Title>
          {!loading ? (
            <>
              <Grid item xs={12} sm={6}>
                <Typography color="textPrimary">Project Title:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="project-title"
                  label="Project Title"
                  // onChange={onChangeSetTitle}
                  value={data.projectTitle}
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
                  //   onChange={onChangeSetDecription}
                  value={data.projectDescription}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="textPrimary">Project day and time:</Typography>
              </Grid>
            </>
          ) : null}
        </Grid>
      ) : (
        <CreatePresentation />
      )}
    </Wrapper>
  );
};

export default withRouter(HomePage);
