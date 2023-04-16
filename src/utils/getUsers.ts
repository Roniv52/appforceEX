import axios from 'axios';

const getUsers = async () => {
  const res = await axios.get('https://randomuser.me/api/?results=10');
  return res;
};

export default getUsers;
