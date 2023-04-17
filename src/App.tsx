import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './store';
import { useEffect } from 'react';
import { getUsers } from './store/reducers';
import { Button, Flex, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import EditUser from './components/EditUser';
import UserCard from './components/UserCard';
import AddUser from './components/AddUser';

function App() {
  const Dispatch = useDispatch();
  const users = useSelector((state: Store) => state.users.users);
  useEffect(() => {
    `1`;
    //@ts-ignore
    Dispatch(getUsers());
  }, []);

  useEffect(() => {}, [users]);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className='App'>
      <h1>Apps Force Users</h1>
      <Button type='submit' onClick={open}>
        Add User+
      </Button>
      {opened && (
        <AddUser
          opened={opened}
          onClose={close}
          overlayProps={{ opacity: 0.75 }}
        />
      )}
      <Flex
        direction={'row'}
        wrap={'wrap'}
        justify={'center'}
        gap={'10rem'}
        rowGap={'md'}
        w={'100%'}
      >
        {users.map((user) => {
          return <UserCard user={user} key={user.login.uuid} />;
        })}
      </Flex>
    </div>
  );
}

export default App;
