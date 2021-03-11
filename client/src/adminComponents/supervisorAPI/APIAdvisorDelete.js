import axios from 'axios';

const DeleteAdvisor = id => {
  const url = `http://localhost:8080/api/advisor/${id}`;
  const headers = {
    'Content-Type': 'application/json',

    'x-auth-token': localStorage.getItem('token'),
  };
  const apiDelete = async (url, headers) => {
    return await axios.delete(url, { headers });
  };

  return apiDelete(url, headers);
};
export default DeleteAdvisor;
