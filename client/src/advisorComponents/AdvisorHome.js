import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Card } from '@material-ui/core';
import styled from 'styled-components';
import { useAuth } from '../../src/studentComponents/auth/auth';
import useFetchPresentations from './util/UseFetchPresentations';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
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
  },
});
const Title = styled.h1.attrs({
  className: 'h1',
})``;
const AdvisorHome = props => {
  const { username } = useAuth();
  const { data, loading } = useFetchPresentations(username);
  if (!username) {
    return <Redirect to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ width: '100%' }} direction="column" alignItems="center">
        {!data
          ? <Title>No student to render!</Title> && <CircularProgress />
          : data.map((x, i) => {
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
            })}
      </Grid>
    </ThemeProvider>
  );
};
const StudentCard = props => {
  const classes = useStyles();

  const url = `/advisor/${props.id}`;

  return (
    <Grid item xs={4} key={props.id}>
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
            <Typography variant="h5" component="h2">
              {props.title}
              {}
            </Typography>
            {<Typography className={classes.pos} color="textSecondary"></Typography>}
            <Typography variant="body2" component="p">
              {props.decrip}
            </Typography>
          </CardContent>

          <Typography style={{ marginLeft: '10px', marginDown: '10px' }} variant="h6" component="p">
            Status: {props.confirm ? 'confirmed' : 'need confirmation'}
          </Typography>
        </Card>
      </Link>
    </Grid>
  );
};

export default withRouter(AdvisorHome);
