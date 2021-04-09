import React, { useState } from 'react';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import {
  useLeaveTeamMutation,
  useLogoutMutation,
} from '../src/generated/graphql';
import { useRouter } from 'next/router';

interface TeamHeaderProps {
  teamName: string;
  username: string;
  teamId: number;
}

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 170px;
`;

const TeamNameHeader = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const DisplayButtonIcon = styled.button`
  font-size: 1rem;
  padding: 2px 5px;
  color: #e5e5e5;
  background-color: #763857;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

const TeamHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonStyles = styled.button`
  margin-bottom: 5px;
  padding: 5px;
  background-color: #763857;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

const UsernameHeader = styled.h3``;

const TeamHeader: React.FC<TeamHeaderProps> = ({
  teamName,
  username,
  teamId,
}) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [showLeaveButton, setShowLeaveButton] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const [leaveTeamMutation] = useLeaveTeamMutation({
    variables: {
      teamId: teamId,
    },
    update: (cache) => {
      cache.evict({ fieldName: 'getUserTeams' });
      cache.evict({ fieldName: 'getTeam' });
      cache.evict({ fieldName: 'getMe' });
    },
  });

  const leaveTeamHandler = async () => {
    const response = await leaveTeamMutation().catch((err) =>
      console.error(err)
    );
    if (!response) return;
    router.push('/dashboard');
  };

  const [logoutMutation, { loading }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutMutation();
    await apolloClient.clearStore();
  };

  return (
    <TeamContainer>
      <TeamHeaderWrapper>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        <DisplayButtonIcon onClick={() => setShowLeaveButton(!showLeaveButton)}>
          {'>'}
        </DisplayButtonIcon>
      </TeamHeaderWrapper>
      {showLeaveButton && (
        <NextLink href="/">
          <ButtonStyles onClick={leaveTeamHandler} disabled={loading}>
            LEAVE TEAM
          </ButtonStyles>
        </NextLink>
      )}
      <TeamHeaderWrapper>
        <UsernameHeader>{username}</UsernameHeader>
        <DisplayButtonIcon onClick={() => setShowLogout(!showLogout)}>
          {'>'}
        </DisplayButtonIcon>
      </TeamHeaderWrapper>
      {showLogout && (
        <NextLink href="/">
          <ButtonStyles onClick={logoutHandler} disabled={loading}>
            LOGOUT
          </ButtonStyles>
        </NextLink>
      )}
    </TeamContainer>
  );
};

export default TeamHeader;
