import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = () => {
  const [advisors, setData] = useState(null);
  const [loadingAdvisors, setLoading] = useState(false);

  const url = `http://localhost:8080/api/advisors`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  const fetchApi = async (url, headers) => {
    setLoading(true);

    axios
      .get(url, { headers })
      .then(response => {
        setData(response.data.advisors);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchApi(url, headers);
  }, []);
  return { advisors, loadingAdvisors };
};

export default useFetch;
