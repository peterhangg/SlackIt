import React from 'react';
import useForm from '../src/utils/useForm';
import { IRegisterInputs } from '../src/utils/types';
import { useRegisterMutation } from '../src/generated/graphql';
import console from 'node:console';

const register: React.FC = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    username: '',
  } as IRegisterInputs);

  const [register, { error }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register({
      variables: inputs
    })
    console.log("REGISTER RESULT:", result);
    resetForm();
  };

  return (
    <>
      {error && <h2>{error.message}</h2>}
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
