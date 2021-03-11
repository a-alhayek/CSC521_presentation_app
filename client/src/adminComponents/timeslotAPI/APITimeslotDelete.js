import axios from 'axios';

const DeleteTimeslot = id => {
  const url = `http://localhost:8080/api/timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const apiDelete = async (url, headers) => {
    return await axios.delete(url, { headers });
  };

  return apiDelete(url, headers);
};
export default DeleteTimeslot;
