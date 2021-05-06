import React, { useState } from 'react';
import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as XLSX from 'xlsx';
import { host } from '../../components/host';
//import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 5,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
  textField: {
    height: '2.5ch',
  },
  label: {
    textAlign: 'right',
    clear: 'both',
    float: 'left',
    marginRight: '15px',
  },
}));
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const CreateStudent = () => {
  const [studentid, setStudentid] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('CS');
  const [isGroup, setIsGroup] = useState(false);
  const [signupStatus, setSignupStatus] = useState(false);

  const setStudentIDOnChange = e => setStudentid(e.target.value.trim());
  const setEmailOnChange = e => setEmail(e.target.value.trim());
  const setFirstNameOnChange = e => setFirstName(e.target.value.trim());
  const setLastNameOnChange = e => setLastName(e.target.value.trim());
  const setMajorOnChange = e => setMajor(e.target.value.trim());
  const [redirect, setRedirect] = useState(null);

  const validateStudentID = () => {
    const reg = /^\d+$/;
    console.log('vID');

    if (reg.test(studentid) && studentid.length === 7) {
      return true;
    }
    alert('Please enter a valid studentid! Only numbers and 7 digits ');
    return false;
  };
  const validateFirstName = () => {
    const regName = /^[a-zA-Z ]+$/;

    if (regName.test(firstName)) {
      return true;
    }
    alert('Please enter a valid first name!');
    return false;
  };
  const validateLastName = () => {
    const regName = /^[a-zA-Z ]+$/;

    if (regName.test(lastName)) {
      return true;
    } else {
      alert('Please enter a valid last name!');
      return false;
    }
  };
  const validateEmail = () => {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEmail.test(email)) {
      return true;
    }
    alert('Please enter a valid email');
    return false;
  };
  const handleSubmitButton = async () => {
    if (!(validateEmail() && validateFirstName() && validateLastName() && validateStudentID())) {
      return;
    } else if (
      window.confirm(
        `Are you sure you want to create the following Student: \nStudentid: ${studentid}\nFirst Name: ${firstName}\nLast Name: ${lastName},\nEmail: ${email}\nMajor: ${major}??`,
      )
    ) {
      const sID = studentid;
      const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
      console.log(fName);
      console.log(lName);
      const url = `${host}student`;
      const student = {
        studentid: sID,
        firstName: fName,
        lastName: lName,
        email: email,
        major: major,
        isGroup: isGroup,
        signupStatus: signupStatus,
      };
      try {
        const response = await axios.post(url, { student });
        setRedirect('/students');
        alert(
          `${response.data.message}, the status of the request to the database is ${response.data.success}`,
        );
      } catch (err) {
        alert(
          `${err}, the status of your request to the database is bad. This might happening because there's already a student with the same data.`,
        );
      }
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <StudentFields
        setStudentid={setStudentIDOnChange}
        setEmail={setEmailOnChange}
        setFirstName={setFirstNameOnChange}
        setLastName={setLastNameOnChange}
        setMajor={setMajorOnChange}
        studentid={studentid}
        email={email}
        firstName={firstName}
        lastName={lastName}
        major={major}
        handleSubmit={handleSubmitButton}
      />
      <UploadStudents setRedirect={setRedirect} redirect={redirect} />
    </div>
  );
};

const StudentFields = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>Create New Student</Title>
      <Grid container spacing={3}>
        <form className={classes.root}>
          <div style={{ margin: 30 }}>
            {
              // Student id code block
            }

            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>
              Student id:
            </Typography>

            <TextField
              required
              id="standard-required"
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setStudentid}
              value={props.studentid}
            />
          </div>
          {
            // FirstName code block
          }
          <div style={{ margin: 30 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>
              First Name:
            </Typography>

            <TextField
              required
              id="standard-required"
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setFirstName}
              value={props.firstName}
            />
          </div>

          {
            // Last Name code block
          }

          <div style={{ margin: 30 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>
              Last Name:
            </Typography>

            <TextField
              required
              id="standard-required"
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setLastName}
              value={props.lastName}
            />
          </div>
          {
            //Advvisor email
          }
          <div style={{ margin: 30 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>
              Email:
            </Typography>

            <TextField
              required
              id="standard-required"
              variant="outlined"
              color="secondary"
              placeholder="required"
              className={classes.textField}
              onChange={props.setEmail}
              value={props.email}
            />
          </div>
          {
            //advisor major
          }
          <div style={{ margin: 30 }}>
            <Typography component="h1" className={classes.label} style={{ marginTop: 13 }}>
              Major:
            </Typography>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={props.major}
              onChange={props.setMajor}>
              <MenuItem value="CS">CS</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
            </Select>
          </div>
          {
            // submit button
          }

          <label htmlFor="contained-button-file">
            <Button
              style={{ marginLeft: 20 }}
              variant="contained"
              color="primary"
              onClick={props.handleSubmit}>
              Submit
            </Button>
          </label>
        </form>
      </Grid>
    </div>
  );
};

const UploadStudents = props => {
  // const [data,setData] = useState([]);
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    let list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    list = handleRenamingObjectKey(list);

    handleAddingStudentsRequest(list);
    //setData(list);
  };
  const handleRenamingObjectKey = list => {
    list = list.map(field => {
      field['studentid'] = field['"ID"'];
      field['firstName'] = field['First Name'];
      field['lastName'] = field['Last'];
      field['email'] = field['Email'];
      field['major'] = field['Major'];
      field['isGroup'] = false;
      field['signupStatus'] = false;
      field['passwordHash'] = `${field['Last']}_${field['"ID"']}`;
      delete field['Advisor Name 1'];

      delete field['"ID"'];
      delete field['First Name'];
      delete field['Last'];
      delete field['Email'];
      delete field['Major'];
      return field;
    });
    return list;
  };
  const handleAddingStudentsRequest = async students => {
    if (
      students.length > 1 &&
      students[0]['studentid'] &&
      students[0]['firstName'] &&
      students[0]['lastName'] &&
      students[0]['email'] &&
      students[0]['major']
    ) {
      alert(`Attempting to add ${students.length - 1} students to the database!`);
      const url = `${host}students`;
      /*  const headers = {
      'Content-Type': 'application/json',

      'x-auth-token': localStorage.getItem('token'),
    }; */
      axios
        .post(url, { students })
        .then(response => {
          alert(response.data.message);
          if (response.data.students === 0) {
          } else {
            props.setRedirect('/students');
          }
        })
        .catch(err => {
          alert(
            `${err}, the status of your request to the database is bad. This might happening because the sheet does'not have matching names.`,
          );
        });
    } else {
      alert(
        `Please make sure it's the correct file!, the columns names should be {"ID"}, {First Name}, {Last}, {Email}, {Major}`,
      );
      window.location.reload();
    }
  };

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = evt => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h3>Upload CSV file to Add students</h3>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      {/*  {data.length !== 0 ? (
        <ReactTable className="-highlight" data={data} columns={tableColumns} />
      ) : null} */}
    </div>
  );
};

export default CreateStudent;
