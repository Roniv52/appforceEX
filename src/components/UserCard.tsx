import React from 'react';
import { User } from '../models/User';
import EditUser from './EditUser';
import { Button, Flex, Group, Popover, Text } from '@mantine/core';
import UserComp from './User';
import { useDisclosure } from '@mantine/hooks';
import { deleteUsers } from '../store/reducers/userReducer';
import { useDispatch } from 'react-redux';

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const Dispatch = useDispatch();

  return (
    <Flex
      direction={'row'}
      align={'center'}
      justify={'space-evenly'}
      w={'35rem'}
    >
      <UserComp
        avatar={user.picture.medium}
        name={user.name.first + ' ' + user.name.last}
        title={user.name.title}
        location={`${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.country}`}
        email={user.email}
        id={user.login.uuid}
      />
      {opened && (
        <EditUser
          opened={opened}
          onClose={close}
          overlayProps={{ opacity: 0.75 }}
          name={user.name}
          email={user.email}
          location={user.location}
          id={user.login.uuid}
        />
      )}
      <Button onClick={open}>Edit</Button>
      <Popover position='bottom' withArrow shadow='md'>
        <Popover.Target>
          <Button color='red'>Delete</Button>
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <Group>
            <Text>are you sure?</Text>
            <Button
              color='red'
              onClick={() => {
                user.login.uuid && Dispatch(deleteUsers(user.login.uuid));
              }}
            >
              yes!
            </Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}
