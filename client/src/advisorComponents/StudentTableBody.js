import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import StudentTableRow from './StudentTableRow';

const StudentTableBody = props => {
  let counter = 0;
  const { data } = props;
  return (
    <TableBody>
      {data
        ? Object.keys(data).map(key => {
            let note = data[key];
            if (!note.title) return null;
            return <StudentTableRow key={++counter} itemNumber={counter} note={note} />;
          })
        : null}
    </TableBody>
  );
};

export default StudentTableBody;
