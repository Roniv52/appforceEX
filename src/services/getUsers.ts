import axios from 'axios';

type Props = {};

const getUsers = async (Users: string) => {
  const res = await axios.post('https://randomuser.me/api/?results=10', Users);
};

export default getUsers;
