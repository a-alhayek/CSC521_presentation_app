import React from 'react';
import Table from '@material-ui/core/Table';
import StudentTableBody from './StudentTableBody';
import StudentTableHeader from './StudentTableHeader';

const NoteTable = props => {
  const tableHeaderNames = ['Name', 'Project Title', 'Last project Decription', 'Presenting Time'];

  return (
    <Table>
      <StudentTableHeader names={tableHeaderNames} style={{ width: '100%' }} />
      <StudentTableBody data={props} style={{ width: '100%' }} />
    </Table>
  );
};

export default NoteTable;
