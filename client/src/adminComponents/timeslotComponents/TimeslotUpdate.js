import React, { useState, useEffect } from 'react';
import useFetchID from '../timeslotAPI/APITimeslotFetchByID';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import updateTimeslot from '../timeslotAPI/APITImeslotUpdate';
import { Redirect } from 'react-router-dom';
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

const TimeslotUpdate = props => {
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [day, setDay] = useState('');
  const [redirect, setRedirect] = useState(null);
  const { data, loading } = useFetchID(props.match.params.id);

  const handleStatusChange = event => {
    setStatus(!status);
  };
  const handleStartTime = e => {
    setStart(e.target.value);
  };
  const handleEndTime = e => {
    setEnd(e.target.value);
  };
  const handleUpdateTimeslot = async e => {
    if (window.confirm('Are you sure you want to update this Timeslot?')) {
      try {
        const res = await updateTimeslot(props.match.params.id, start, end, status, day);

        alert(`Successful request to the database success: ${res.data.success}`);
        setRedirect('/timeslots');
      } catch (err) {
        alert('Something went wrong updating the timeslot, bad request!');
      }
    }
  };

  useEffect(() => {
    if (data && !loading && !load) {
      setStatus(data.status);
      setStart(data.start);
      setEnd(data.end);
      setDay(data.day);
      setLoad(true);
    }
  });
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <UpdateFields
      status={status}
      start={start}
      end={end}
      day={day}
      handleUpdate={handleUpdateTimeslot}
      handleStatus={handleStatusChange}
      handleStart={handleStartTime}
      handleEnd={handleEndTime}></UpdateFields>
  );
};
const UpdateFields = props => {
  return (
    <Wrapper>
      <Title>Update Timeslots</Title>
      <Wrapper>
        <Label>Start Time: </Label>
        <InputText type="text" defaultValue={props.start} onChange={props.handleStart}></InputText>
      </Wrapper>
      <Wrapper>
        <Label>End Time: </Label>
        <InputText type="text" defaultValue={props.end} onChange={props.handleEnd}></InputText>
      </Wrapper>
      <Wrapper>
        <Label>Day Date: </Label>
        <InputText type="text" defaultValue={props.day} disabled></InputText>
      </Wrapper>
      <Wrapper>
        <Label>Day Date: </Label>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.status}
              name="status"
              color="primary"
              onChange={props.handleStatus}
            />
          }
          label={props.status ? 'Taken' : 'Available'}
        />
      </Wrapper>
      <Wrapper>
        <Button onClick={props.handleUpdate}>Update Timeslot</Button>
        <CancelButton href={'/timeslots'}>Cancel</CancelButton>
      </Wrapper>
    </Wrapper>
  );
};

export default TimeslotUpdate;
