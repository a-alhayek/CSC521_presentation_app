'/students/CS';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { host } from '../../components/host';
const useFetchStudent = studentsIds => {
  const [students, setData] = useState(null);
  const [loadingStudents, setLoading] = useState(false);

  const username = localStorage.getItem('username');
  const url = `${host}students/CS`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async (url, headers, studentsIds) => {
    setLoading(true);

    axios
      .post(url, { headers, studentsIds })
      .then(response => {
        setData(response.data.students);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchApi(url, headers, studentsIds);
  }, []);
  return { students, loadingStudents };
};

export default useFetchStudent;
