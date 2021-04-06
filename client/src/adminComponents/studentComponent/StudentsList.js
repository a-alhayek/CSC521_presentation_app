import styled from 'styled-components';
import ReactTable from 'react-table-6';
import DeleteButton from '../../components/buttons/DeleteButton';
import React from 'react';
import useFetchStudents from '../studentAPI/APIStudentsFetch';
import DeleteStudent from '../studentAPI/APIStudentDelete';
import Button from '@material-ui/core/Button';
import 'react-table-6/react-table.css';
import axios from 'axios';
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const StudentsList = () => {
  const { students, loadingStudents } = useFetchStudents();

  const handleOnClickDeleteAllBtn = async e => {
    console.log(students);
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete all Students??')) {
      let url = 'http://localhost:8080/api/students';
      const headers = {
        'Content-Type': 'application/json',

        'x-auth-token': localStorage.getItem('token'),
      };
      try {
        await axios.delete(url, { headers });
        url = 'http://localhost:8080/api/presentations';
        await axios.delete(url, { headers });
        alert('deleted all Students');

        window.location.reload();
      } catch (err) {
        alert('Error deleting all Students.');
      }
    }
  };

  return (
    <TableList
      deleteALl={handleOnClickDeleteAllBtn}
      students={students}
      loading={loadingStudents}></TableList>
  );
};

const TableList = props => {
  const handleRemoveItem = async (id, sid) => {
    await DeleteStudent(id, sid);
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
      Header: 'Student ID',
      accessor: 'studentid',
      filterable: true,
      cell: props => {
        return <span data-end={props.original.studentid}>{props.original.studentid}</span>;
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
      id: 'isGroup',
      Header: 'Group Project',
      accessor: d => (d.isGroup ? 'Yes' : 'No'),

      cell: props => {
        const { isGroup } = props.original;
        {
          return <span data-status={isGroup}>{isGroup}</span>;
        }
      },
    },
    {
      id: 'signupStatus',
      Header: 'Signup Status',
      accessor: d => (d.signupStatus ? 'signed up' : 'not yet'),

      cell: props => {
        const { signupStatus } = props;
        {
          return <span data-status={signupStatus}>{signupStatus}</span>;
        }
      },
    },

    {
      Header: '',
      accessor: '',
      Cell: props => {
        return (
          <span data-delete-id={props.original._id}>
            <DeleteButton
              id={props.original._id}
              sid={props.original.studentid}
              item=""
              onDelete={handleRemoveItem}
            />
          </span>
        );
      },
    },
  ];

  return (
    <Wrapper>
      {props.students ? (
        <Wrapper>
          <ReactTable
            className="-highlight"
            data={props.students}
            columns={columns}
            loading={props.loading}
          />
          <br></br>
          <Button variant="contained" color="secondary" onClick={props.deleteALl}>
            Delete All
          </Button>
        </Wrapper>
      ) : (
        <Title>No Students to render!</Title>
      )}
    </Wrapper>
  );
};

export default StudentsList;
