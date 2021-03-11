import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchID = id => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = `http://localhost:8080/api/timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const fetchApi = async (url, headers) => {
    setLoading(true);
    const response = await axios.get(url, { headers });

    setData(response.data.timeslots);
    setLoading(false);
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);

  return { data, loading };
};
export default useFetchID;
