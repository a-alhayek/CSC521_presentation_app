import styled from 'styled-components';
import ReactTable from 'react-table-6';
import DeleteButton from '../../components/buttons/DeleteButton';
import React from 'react';
import useFetch from '../supervisorAPI/APIAdvisorsFetch';
import DeleteAdvisor from '../supervisorAPI/APIAdvisorDelete';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const AdvisorsList = () => {
  const { data, loading } = useFetch();

  return <TableList advisors={data} loading={loading}></TableList>;
};

const TableList = props => {
  const handleRemoveItem = async id => {
    await DeleteAdvisor(id);
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
      Header: 'First Name',
      accessor: 'firstName',
      filterable: true,
      cell: props => {
        return <span data-date={props.original.firstName}>{props.value}</span>;
      },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      filterable: true,
      cell: props => {
        return <span data-start={props.original.lastName}>{props.value}</span>;
      },
    },
    {
      Header: 'Advisor ID',
      accessor: 'advisorid',
      filterable: true,
      cell: props => {
        return <span data-end={props.original.advisorid}>{props.original.advisorid}</span>;
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      filterable: true,
      cell: props => {
        return <span data-end={props.original.email}>{props.original.email}</span>;
      },
    },

    {
      Header: '',
      accessor: '',
      Cell: props => {
        return (
          <span data-delete-id={props.original._id}>
            <DeleteButton id={props.original._id} item="Advisors" onDelete={handleRemoveItem} />
          </span>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {props.advisors ? (
        <ReactTable data={props.advisors} columns={columns} loading={props.loading} />
      ) : null}
    </Wrapper>
  );
};

export default AdvisorsList;
