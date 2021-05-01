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

export interface ILogin {
  email: string,
  password: string,
}

export interface IRegister {
  username: string,
  email: string,
  password: string,
}

export interface ICreateTeam {
  name: string,
  description: string,
}

export interface ICreateChannel {
  name: string,
  description: string,
}

export interface ICreateMessage {
  image?: any,
  text?: string
}

export interface IEditProfile {
  username: string,
  password: string,
  newPassword?: string,
  image?: File
}