import axios from 'axios';

const DeleteStudent = id => {
  const url = `http://localhost:8080/api/student/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const apiDelete = (url, headers) => {
    return axios
      .delete(url, { headers })
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  };

  return apiDelete(url, headers);
};
export default DeleteStudent;
