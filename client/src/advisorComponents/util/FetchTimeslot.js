'/students/CS';

import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchTimeslot = id => {
  const [timeslot, setData] = useState(null);
  const [loadingTimeslot, setLoading] = useState(false);

  const username = localStorage.getItem('username');
  const url = `http://localhost:8080/api/timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async url => {
    setLoading(true);

    axios
      .get(url)
      .then(response => {
        setData(response.data.timeslots);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { timeslot, loadingTimeslot };
};

export default useFetchTimeslot;
