import axios from 'axios';
import { useState, useEffect } from 'react';
import { host } from '../../components/host';
const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `${host}timeslots`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = (url, headers) => {
    setLoading(true);

    axios
      .get(url, { headers })
      .then(response => {
        let arr = response.data.timeslots;

        arr.sort((a, b) => {
          return new Date(a.day + a.start.substring(4)) - new Date(b.day + b.start.substring(4));
        });
        setData(arr);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { data, loading };
};

export default useFetch;
