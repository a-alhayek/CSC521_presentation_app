import axios from 'axios';

const updateTimeslot = async (id, start, end, status, day) => {
  const url = `http://localhost:8080/api/timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  return await axios.put(url, { headers, start, end, status, day });
};
export default updateTimeslot;
