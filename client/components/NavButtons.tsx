import React from 'react';
import NextLink from 'next/link';
import { useApolloClient } from '@apollo/client';
import { useGetMeQuery, useLogoutMutation } from '../src/generated/graphql';
import { isServer } from '../src/utils/isServer';
import { NavButtonContainer, NavButtonStyles } from './styles/NavButtons';

const NavButtons: React.FC = () => {
  const apolloClient = useApolloClient();
  const { data } = useGetMeQuery({
    skip: isServer(),
  });
  const [logoutMutation, { loading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutMutation();
    await apolloClient.clearStore();
    await apolloClient.resetStore();
  };

  return (
    <NavButtonContainer>
      {!data?.getMe ? (
        <>
          <NextLink href="/login">
            <NavButtonStyles mr="1rem">LOGIN</NavButtonStyles>
          </NextLink>
          <NextLink href="/register">
            <NavButtonStyles>REGISTER</NavButtonStyles>
          </NextLink>
        </>
      ) : (
        <>
          <NavButtonStyles mr="1rem" onClick={logoutHandler} disabled={loading}>
            LOGOUT
          </NavButtonStyles>
          <NextLink href="/dashboard">
            <NavButtonStyles>DASHBOARD</NavButtonStyles>
          </NextLink>
        </>
      )}
    </NavButtonContainer>
  );
};

export default NavButtons;
