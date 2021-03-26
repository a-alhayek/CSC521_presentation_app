import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchTimeslots = () => {
  const [timeslots, setTimeslots] = useState(null);
  const [load, setLoad] = useState(false);

  const username = localStorage.getItem('username');
  const url = `http://localhost:8080/api/timeslots/available`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async (url, headers) => {
    setLoad(true);

    axios
      .get(url, { headers })
      .then(response => {
        setTimeslots(response.data.timeslots);
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
