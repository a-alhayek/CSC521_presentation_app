import axios from 'axios';
import { host } from '../../components/host';
const updateTimeslot = async (id, start, end, status, day) => {
  const url = `${host}timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };

  return await axios.put(url, { headers, start, end, status, day });
};
export default updateTimeslot;
