import axios from 'axios';
import { host } from '../../components/host';

const DeleteStudent = (id, sid) => {
  const url = `${host}student/${id}`;
  const surl = `${host}presentationstu/${sid}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const apiDelete = async (url, surl, headers) => {
    try {
      await axios.delete(url, { headers });
      await axios.delete(surl, { headers });
    } catch (err) {
      console.log(err);
    }

    return axios;
  };

  return apiDelete(url, surl, headers);
};
export default DeleteStudent;
