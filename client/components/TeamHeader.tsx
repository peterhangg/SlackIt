import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import {
  useLeaveTeamMutation,
  useLogoutMutation,
} from '../src/generated/graphql';
import { useRouter } from 'next/router';
import {
  ButtonStyles,
  DisplayButtonIcon,
  TeadHeaderContainer,
  TeamHeaderWrapper,
  TeamNameHeader,
  UsernameHeader,
} from './styles/TeamHeader';

interface TeamHeaderProps {
  teamName: string;
  username: string;
  teamId: number;
}

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
    const logout = await logoutMutation();
    await apolloClient.clearStore();

    if (!logout) {
      return;
    }

    router.push('/');
  };

  return (
    <TeadHeaderContainer>
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
        <>
          <NextLink href="/edit-profile">
            <ButtonStyles>EDIT PROFILE</ButtonStyles>
          </NextLink>
          <ButtonStyles onClick={logoutHandler} disabled={loading}>
            LOGOUT
          </ButtonStyles>
        </>
      )}
    </TeadHeaderContainer>
  );
};

export default TeamHeader;
