import axios from 'axios';

const fetch = async () => {
  const username = localStorage.getItem('username');
  const url = `http://localhost:8080/api/student/stu/${username}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  console.log(localStorage.getItem('token'));
  try {
    const response = await axios.get(url, { headers });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    return err;
  }
};

export default fetch;
