import axios from 'axios';
import { useState, useEffect } from 'react';
import { host } from '../../components/host';
let base64 = require('base-64');
const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = base64.decode(localStorage.getItem('username'));
  const url = `${host}presentation/${username}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async (url, headers) => {
    setLoading(true);

    axios
      .get(url, { headers })
      .then(response => {
        setData(response.data.presentation);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);

        setLoading(false);
      });
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { data, loading };
};

export default useFetch;
