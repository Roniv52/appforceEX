export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  picture: {
    medium: string;
  };
}

export interface userEdit {
  name?: {
    title: string;
    first: string;
    last: string;
  };
  location?: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    country: string;
  };
  email?: string;
}
