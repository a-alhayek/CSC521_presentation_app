import axios from 'axios';
import { useState, useEffect } from 'react';
import { host } from '../../components/host';
const useFetchID = id => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = `${host}timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const fetchApi = (url, headers) => {
    setLoading(true);
    axios
      .get(url, { headers })
      .then(response => {
        setData(response.data.timeslots);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);

  return { data, loading };
};
export default useFetchID;
