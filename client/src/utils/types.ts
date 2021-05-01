import { Dispatch, SetStateAction } from 'react';
export type Dispatcher<S> = Dispatch<SetStateAction<S>>;
export interface IFormInputs {
  email?: string,
  password?: string,
  username?: string,
  name?: string,
  text?: string,
  description?: string,
  image?: any,
  newPassword?: string
};
