import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = () => {
  const [students, setData] = useState(null);
  const [loadingStudents, setLoading] = useState(false);

  const url = `http://localhost:8080/api/students`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = (url, headers) => {
    setLoading(true);

    axios
      .get(url, { headers })
      .then(response => {
        setData(response.data.students);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { students, loadingStudents };
};

export default useFetch;
