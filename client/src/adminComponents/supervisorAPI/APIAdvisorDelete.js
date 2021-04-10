import axios from 'axios';

const DeleteAdvisor = id => {
  const url = `http://localhost:8080/api/advisor/${id}`;
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
export default DeleteAdvisor;
