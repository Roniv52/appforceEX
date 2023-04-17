import React, { useEffect } from 'react';
import { Button, Modal, ModalProps, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { userEdit } from '../models/user';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { updateUsers } from './../store/reducers';

interface Props extends ModalProps, userEdit {}

const EditUser = ({ id, name, email, location, onClose, ...props }: Props) => {
  const form = useForm({
    initialValues: {
      name: { ...name },
      email: email,
      location: { ...location, street: { ...location?.street } },
    },
    validate: {
      name: {
        first: (value) =>
          //@ts-ignore
          value.length < 3 ? 'Name must have at least 3 letters' : null,
      },
      //@ts-ignore
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const Dispatch = useDispatch();
  return (
    <div>
      <Modal
        title='Edit User'
        onClose={() => {
          onClose();
        }}
        {...props}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            id && Dispatch(updateUsers(id, values as userEdit));
            onClose();
          })}
        >
          <TextInput
            required
            label='title:'
            {...form.getInputProps('name.title')}
          />
          <TextInput
            required
            label='first:'
            {...form.getInputProps('name.first')}
          />
          <TextInput
            required
            label='last:'
            {...form.getInputProps('name.last')}
          />
          <TextInput required label='email:' {...form.getInputProps('email')} />
          <TextInput
            required
            label='country:'
            {...form.getInputProps('location.country')}
          />

          <TextInput
            required
            label='city:'
            {...form.getInputProps('location.city')}
          />
          <TextInput
            required
            label='street:'
            {...form.getInputProps('location.street.name')}
          />
          <TextInput
            required
            label='street number:'
            {...form.getInputProps('location.street.number')}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default EditUser;
