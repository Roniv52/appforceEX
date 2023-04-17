import React, { useEffect } from 'react';
import { Button, Modal, ModalProps, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { userEdit } from '../models/User';
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
          <TextInput label='title:' {...form.getInputProps('name.title')} />
          <TextInput label='first:' {...form.getInputProps('name.first')} />
          <TextInput label='last:' {...form.getInputProps('name.last')} />
          <TextInput label='email:' {...form.getInputProps('email')} />
          <TextInput
            label='country:'
            {...form.getInputProps('location.country')}
          />

          <TextInput label='city:' {...form.getInputProps('location.city')} />
          <TextInput
            label='street:'
            {...form.getInputProps('location.street.name')}
          />
          <TextInput
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
