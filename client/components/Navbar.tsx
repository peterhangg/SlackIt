import React from 'react';
import NextLink from 'next/link';
import { useApolloClient } from '@apollo/client';
import { useGetMeQuery, useLogoutMutation } from '../src/generated/graphql';
import { isServer } from '../src/utils/isServer';

const Navbar: React.FC = () => {
  const apolloClient = useApolloClient();
  const { data } = useGetMeQuery({
    skip: isServer(),
  });
  const [logoutMutation, { loading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutMutation();
    await apolloClient.resetStore();
  };

  return (
    <div>
      {!data?.getMe ? (
        <ul>
          <NextLink href="/login">
            <li>Login</li>
          </NextLink>
          <NextLink href="/register">
            <li>Register</li>
          </NextLink>
        </ul>
      ) : (
        <button onClick={logoutHandler} disabled={loading}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
