import React from 'react';
import useFetch from '../timeslotAPI/APITimeslotsFetch';
import DeleteTimeslot from '../timeslotAPI/APITimeslotDelete';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import DeleteButton from '../../components/buttons/DeleteButton';
import UpdateButton from './TimeslotUpdate';
import Button from '@material-ui/core/Button';
import updateTimeslot from '../timeslotAPI/APITImeslotUpdate';
import { host } from '../../components/host';
import 'react-table-6/react-table.css';
import axios from 'axios';
import { useAuth } from '../../studentComponents/auth/auth';
import { Redirect } from 'react-router-dom';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const TimeList = () => {
  const { data, loading } = useFetch();
  const { username, role } = useAuth();

  const handleOnClickDeleteAllBtn = async e => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete all timeslots??')) {
      const url = `${host}timeslots`;
      const headers = {
        'Content-Type': 'application/json',

        'x-auth-token': localStorage.getItem('token'),
      };
      try {
        await axios.delete(url, { headers });
        alert('deleted all timeslots');
        window.location.reload();
      } catch (err) {
        alert('Error deleting all timeslots.');
      }
    }
  };
  if (!username && role !== 'admin') {
    return <Redirect to="/" />;
  }
  return (
    <TimeslotsList
      deleteALl={handleOnClickDeleteAllBtn}
      timeslots={data}
      loading={loading}></TimeslotsList>
  );
};

const TimeslotsList = props => {
  const handleRemoveItem = async id => {
    await DeleteTimeslot(id);
    window.location.reload();
  };
  const handleUpdateItem = async (id, start, end, day, status) => {
    await updateTimeslot(id, start, end, status, day);
    window.location.reload();
  };

  const columns = [
    {
      Header: 'Date',
      accessor: 'day',
      filterable: true,
      cell: props => {
        return <span data-date={props.original.day}>{props.value}</span>;
      },
    },
    {
      Header: 'Starting time',
      accessor: 'start',
      filterable: true,
      cell: props => {
        return <span data-start={props.original.start}>{props.value}</span>;
      },
    },
    {
      Header: 'Ending time',
      accessor: 'end',
      filterable: true,
      cell: props => {
        return <span data-end={props.original.end}>{props.original.end}</span>;
      },
    },
    {
      id: 'status',
      Header: 'Timeslot Status',
      accessor: d => (d.status ? 'reserved' : 'available'),
      cell: props => {
        const { status } = props;
        {
          return <span data-status={status}>{status}</span>;
        }
      },
    },
    {
      Header: '',
      accessor: '',
      Cell: props => {
        return (
          <span data-update-id={props.original._id}>
            <UpdateButton
              item=" availability"
              id={props.original._id}
              start={props.original.start}
              end={props.original.end}
              day={props.original.day}
              status={props.original.status ? true : false}
              onUpdate={handleUpdateItem}
            />
          </span>
        );
      },
    },
    {
      Header: '',
      accessor: '',
      Cell: props => {
        return (
          <span data-delete-id={props.original._id}>
            <DeleteButton id={props.original._id} item=" Timeslot" onDelete={handleRemoveItem} />
          </span>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {props.timeslots ? (
        <Wrapper>
          <ReactTable
            className="-highlight"
            data={props.timeslots}
            columns={columns}
            loading={props.loading}
          />
          <br></br>
          <Button variant="contained" color="secondary" onClick={props.deleteALl}>
            Delete All
          </Button>
        </Wrapper>
      ) : (
        <Title>No Timeslots to render!</Title>
      )}
    </Wrapper>
  );
};

export default TimeList;
