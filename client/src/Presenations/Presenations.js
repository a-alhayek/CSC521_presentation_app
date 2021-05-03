import React from 'react';
import FetchData from './FetchData';
import styled from 'styled-components';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { Link } from 'react-router-dom';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Button from '@material-ui/core/Button';
const Title = styled.h1.attrs({
  className: 'h1',
})``;
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;

  white-space: normal;
`;

const Schedule = props => {
  const { data, loading } = FetchData();

  return <TableList route={props.match.path} data={data} loading={loading}></TableList>;
};

const TableList = props => {
  const columns = [
    {
      Header: 'Project Title',
      accessor: 'title',

      cell: props => {
        return <span data-date={props.original.title}>{props.value}</span>;
      },
    },
    {
      Header: 'Project Decription',
      accessor: 'dcrip',
      width: 320,

      Cell: row => (
        <TextareaAutosize
          value={row.original.dcrip}
          disabled={true}
          style={{ width: 300, borderColor: 'black' }}></TextareaAutosize>
      ),
    },
    {
      Header: 'Team Members',
      accessor: 'students',

      cell: props => {
        return <span data-date={props.original.students}>{props.value}</span>;
      },
    },
    {
      Header: 'Advisor',
      accessor: 'advisor',

      cell: props => {
        return <span data-start={props.original.advisor}>{props.value}</span>;
      },
    },
    {
      Header: 'Date',
      accessor: 'day',

      cell: props => {
        return <span data-date={props.original.day}>{props.value}</span>;
      },
    },
    {
      Header: 'Time',
      accessor: 'start',

      cell: props => {
        return <span data-date={props.original.start}>{props.value}</span>;
      },
    },
  ];
  const Doc = () => {
    const columns = [
      { header: 'Project Title', dataKey: 'title' },
      { header: 'Project Decription', dataKey: 'dcrip' },

      { header: 'Team Members', dataKey: 'students' },
      { header: 'Advisor', dataKey: 'advisor' },
      { header: 'Date', dataKey: 'day' },
      { header: 'Time', dataKey: 'start' },
    ];
    const doc = new jsPDF();
    autoTable(doc, {
      styles: { minCellWidth: 20, halign: 'center' },
      //  columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      body: props.data,
      columns: columns,
    });
    doc.save('table.pdf');
  };

  return (
    <Wrapper>
      {props.data ? (
        <Wrapper>
          <Title>Presentations Schedule</Title>
          {props.route === '/schedule' ? (
            <Button variant="contained" color="primary" component={Link} to="/">
              Login
            </Button>
          ) : null}
          <ReactTable
            className="-highlight"
            data={props.data}
            columns={columns}
            loading={props.loading}
          />
          <Button variant="contained" color="primary" onClick={Doc}>
            Download Schedule
          </Button>
        </Wrapper>
      ) : (
        <Title>No Presentations to render!</Title>
      )}
    </Wrapper>
  );
};

export default Schedule;
