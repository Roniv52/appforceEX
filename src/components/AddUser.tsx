import { Button, FileInput, Modal, ModalProps, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '../models/User';
import { useForm } from '@mantine/form';
import { addUsers } from '../store/reducers/userReducer';
import { useDispatch } from 'react-redux';

interface Props extends ModalProps {}

const AddUser = ({ onClose, ...props }: Props) => {
  const Dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: {
        title: null,
        first: null,
        last: null,
      },
      location: {
        street: {
          number: null,
          name: null,
        },
        city: null,
        country: null,
      },
      email: null,
      login: {
        uuid: null,
        username: null,
        password: null,
      },
      picture: {
        medium: null,
      },
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
  return (
    <div>
      <Modal
        title='Add User'
        onClose={() => {
          onClose();
        }}
        {...props}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            //@ts-ignore
            Dispatch(addUsers(values));
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
          <TextInput
            required
            label='Link To Picture'
            {...form.getInputProps('picture.medium')}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
