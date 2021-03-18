import React from 'react';
import useForm from '../src/utils/useForm';
import { IRegisterInputs } from '../src/utils/types';

const register: React.FC = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    username: '',
  } as IRegisterInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    resetForm();
  };

  return (
    <>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            placeholder="username..."
            onChange={handleChange}
            value={inputs.username}
            required
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            placeholder="name@work-email.com..."
            onChange={handleChange}
            value={inputs.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            placeholder="password "
            onChange={handleChange}
            value={inputs.password}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default register;
