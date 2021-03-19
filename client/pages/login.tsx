import React from 'react';
import { useRouter } from 'next/router';
import {
  GetMeDocument,
  GetMeQuery,
  useLoginMutation,
} from '../src/generated/graphql';
import useForm from '../src/utils/useForm';

const Login: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [loginMutation, { loading, error }] = useLoginMutation({
    variables: inputs as any,
    update(cache, { data }) {
      cache.writeQuery<GetMeQuery>({
        query: GetMeDocument,
        data: {
          __typename: 'Query',
          getMe: data?.login,
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginMutation().catch((err) => console.error(err));
    if (!response) {
      return;
    }
    router.push('/');
  };

  return (
    <>
      {error && <h2>{error.message}</h2>}
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="password"
            onChange={handleChange}
            value={inputs.password}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
