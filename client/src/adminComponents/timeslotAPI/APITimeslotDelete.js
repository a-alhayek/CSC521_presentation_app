import axios from 'axios';
import { host } from '../../components/host';
const DeleteTimeslot = id => {
  const url = `${host}timeslot/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const apiDelete = (url, headers) => {
    return axios
      .delete(url, { headers })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };

  return apiDelete(url, headers);
};
export default DeleteTimeslot;
