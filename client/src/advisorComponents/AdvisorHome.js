import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Card } from '@material-ui/core';
import styled from 'styled-components';
import { useAuth } from '../../src/studentComponents/auth/auth';
import useFetchPresentations from './util/UseFetchPresentations';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'Sans-serif',
  },
  confirm: {
    color: 'blue',
    marginLeft: '10px',
    marginDown: '10px',
  },
  notConfirm: {
    color: 'red',
    marginLeft: '10px',
    marginDown: '10px',
  },
});
const Title = styled.h1.attrs({
  className: 'h1',
})``;
const AdvisorHome = props => {
  const { username, role } = useAuth();
  const { data, loading } = useFetchPresentations(username);
  if (!username && role !== 'advisor') {
    return <Redirect to="/login" />;
  }

  return (
    <Grid container xl={3}>
      {!data ? (
        <Title>No student to render!</Title>
      ) : (
        data.map((x, i) => {
          return (
            <StudentCard
              key={x._id}
              timeslot={x.timeslotId}
              id={x._id}
              title={x.projectTitle}
              decrip={x.projectDescription}
              confirm={x.confirm}
              studentsIds={x.studentsId}
              timeslotId={x.timeslotId}
            />
          );
        })
      )}
    </Grid>
  );
};
const StudentCard = props => {
  const classes = useStyles();

  const url = `/advisor/${props.id}`;
  return (
    <Grid item key={props.id}>
      <Link
        to={{
          pathname: url,
          state: {
            studentsIds: props.studentsIds,
            timeslotID: props.timeslotId,
            title: props.title,
            decrip: props.decrip,
            confirm: props.confirm,
          },
        }}
        style={{ textDecoration: 'none', color: '#000' }}>
        <Card className={classes.root} color="primary">
          <CardContent>
            {/*
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>*/}
            <Typography component="h2">{props.title}</Typography>

            <Typography className={classes.pos}>{props.decrip}</Typography>
          </CardContent>

          <Typography
            className={props.confirm ? classes.confirm : classes.notConfirm}
            variant="h6"
            component="p">
            Status: {props.confirm ? 'confirmed' : 'need confirmation'}
          </Typography>
        </Card>
      </Link>
    </Grid>
  );
};

export default withRouter(AdvisorHome);
