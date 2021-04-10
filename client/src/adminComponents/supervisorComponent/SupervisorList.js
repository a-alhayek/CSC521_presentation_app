import styled from 'styled-components';
import ReactTable from 'react-table-6';
import DeleteButton from '../../components/buttons/DeleteButton';
import React from 'react';
import useFetchAdvisors from '../supervisorAPI/APIAdvisorsFetch';
import DeleteAdvisor from '../supervisorAPI/APIAdvisorDelete';
import 'react-table-6/react-table.css';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const Title = styled.h1.attrs({
  className: 'h1',
})``;
const AdvisorsList = () => {
  const { advisors, loadingAdvisors } = useFetchAdvisors();

  return <TableList advisors={advisors} loading={loadingAdvisors}></TableList>;
};

const TableList = props => {
  const handleRemoveItem = async id => {
    await DeleteAdvisor(id);
    window.location.reload();
  };

  const columns = [
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
            <DeleteButton id={props.original._id} item="" onDelete={handleRemoveItem} />
          </span>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {props.advisors ? (
        <ReactTable
          className="-highlight"
          data={props.advisors}
          columns={columns}
          loading={props.loading}
        />
      ) : (
        <Title>No Advisors to render!</Title>
      )}
    </Wrapper>
  );
};

export default AdvisorsList;
