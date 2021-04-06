import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';
import { ButtonStyle } from '../components/styles/shared';
import { useGetMeQuery, useLogoutMutation } from '../src/generated/graphql';
import { isServer } from '../src/utils/isServer';

type Props = {
  mr: string;
};


const ButtonWrapper = styled.div`
  margin-top: 5%;
  margin-left: 10%;
`;

// const ButtonStyle = styled.button`
//   background-color: #611f69;
//   padding: 19px 40px 20px;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   margin-right: 2rem;
//   width: 180px;
//   border-radius: 5px;
//   font-weight: 700;
//   transition: background-color 0.3s linear, color 0.3s linear;
//   &:hover {
//     background-color: #4a154b
//   }
// `;

const NavButtons: React.FC = () => {
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
    <ButtonWrapper>
      {!data?.getMe ? (
        <>
          <NextLink href="/login">
            <ButtonStyle>LOGIN</ButtonStyle>
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
