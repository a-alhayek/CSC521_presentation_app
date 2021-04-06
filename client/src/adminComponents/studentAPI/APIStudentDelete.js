import axios from 'axios';

const DeleteStudent = (id, sid) => {
  const url = `http://localhost:8080/api/student/${id}`;
  const surl = `http://localhost:8080/api/presentationstu/${sid}`;
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
