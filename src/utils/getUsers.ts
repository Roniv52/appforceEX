import axios from 'axios';
import { User } from '../models/User';

const getUsers: () => Promise<User[]> = async () => {
  const res = await axios.get('https://randomuser.me/api/?results=10');
  return res.data.results as Promise<User[]>;
};

export default getUsers;
