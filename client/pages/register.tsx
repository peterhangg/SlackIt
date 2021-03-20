import React from 'react';
import useForm from '../src/utils/useForm';
import { useRouter } from 'next/router';
import {
  GetMeDocument,
  GetMeQuery,
  useRegisterMutation,
} from '../src/generated/graphql';
import { withApollo } from '../src/apollo/client';

const Register: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    username: '',
  });

  const [registerMutation, { error, loading }] = useRegisterMutation({
    variables: inputs as any,
    update: (cache, { data }) => {
      cache.writeQuery<GetMeQuery>({
        query: GetMeDocument,
        data: {
          __typename: 'Query',
          getMe: data?.register,
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await registerMutation().catch((err) =>
      console.error(err)
    );
    if (!response) {
      return;
    }
    resetForm();
    router.push('/');
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
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
