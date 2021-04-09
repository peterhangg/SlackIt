import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';
import { ButtonStyle } from '../components/styles/shared';
import { useGetMeQuery, useLogoutMutation } from '../src/generated/graphql';
import { isServer } from '../src/utils/isServer';

const ButtonWrapper = styled.div`
  margin-top: 5%;
  margin-left: 10%;
`;

const NavButtons: React.FC = () => {
  const apolloClient = useApolloClient();
  const { data } = useGetMeQuery({
    skip: isServer(),
  });
  const [logoutMutation, { loading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutMutation();
    await apolloClient.clearStore();
  };

  return (
    <ButtonWrapper>
      {!data?.getMe ? (
        <>
          <NextLink href="/login">
            <ButtonStyle mr="2rem">LOGIN</ButtonStyle>
          </NextLink>
          <NextLink href="/register">
            <ButtonStyle>REGISTER</ButtonStyle>
          </NextLink>
          </>
      ) : (
        <>
          <ButtonStyle onClick={logoutHandler} disabled={loading} mr="2rem">
            LOGOUT
          </ButtonStyle>
          <NextLink href="/create-team">
            <ButtonStyle>CREATE TEAM</ButtonStyle>
          </NextLink>
        </>
      )}
    </ButtonWrapper>
  );
};

export default NavButtons;
