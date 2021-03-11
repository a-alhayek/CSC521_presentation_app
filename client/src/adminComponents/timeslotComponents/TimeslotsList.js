import React from 'react';
import useFetch from '../timeslotAPI/APITimeslotsFetch';
import DeleteTimeslot from '../timeslotAPI/APITimeslotDelete';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import DeleteButton from '../../components/buttons/DeleteButton';
import { Link } from 'react-router-dom';
import 'react-table-6/react-table.css';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const TimeList = () => {
  const { data, loading } = useFetch();

  return <TimeslotsList timeslots={data} loading={loading}></TimeslotsList>;
};

const TimeslotsList = props => {
  const handleRemoveItem = async id => {
    await DeleteTimeslot(id);
    window.location.reload();
  };

  const columns = [
    {
      Header: 'ID',
      accessor: '_id',
      filterable: true,
      cell: props => {
        return <span data-date-id={props.original._id}>{props.value}</span>;
      },
    },
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
      accessor: d => (d.status ? 'Taken' : 'available'),

      //filterable: true,

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
          <Link data-update-id={props.original._id} to={`/timeslot/update/${props.original._id}`}>
            Update Timeslot
          </Link>
        );
      },
    },
    {
      Header: '',
      accessor: '',
      Cell: props => {
        return (
          <span data-delete-id={props.original._id}>
            <DeleteButton id={props.original._id} item="Timeslot" onDelete={handleRemoveItem} />
          </span>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {props.timeslots ? (
        <ReactTable data={props.timeslots} columns={columns} loading={props.loading} />
      ) : null}
    </Wrapper>
  );
};

export default TimeList;
