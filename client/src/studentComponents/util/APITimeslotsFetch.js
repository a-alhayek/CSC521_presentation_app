import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchTimeslots = () => {
  const [timeslots, setTimeslots] = useState(null);
  const [load, setLoad] = useState(false);

  const username = localStorage.getItem('username');
  const url = `http://localhost:8080/api/timeslots`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async (url, headers) => {
    setLoad(true);

    axios
      .get(url, { headers })
      .then(response => {
        let arr = response.data.timeslots;
        arr.sort((a, b) => {
          return new Date(a.day + a.start.substring(4)) - new Date(b.day + b.start.substring(4));
        });
        setTimeslots(arr);
        setLoad(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { timeslots, load };
};

export default useFetchTimeslots;
