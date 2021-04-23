import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PageHeader } from './styles/shared';
import { useGetTeamQuery } from '../src/generated/graphql';
import NextLink from 'next/link';
import { UserIconWrapper, UserIcon } from './styles/Messages';

interface MembersModalProps {
  teamId: number;
}

export const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1
  }
`;

const ModalWrapper = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 40%;
  height: 55%;
  /* max-width: 550px; */
  /* max-height: 450px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  animation: 1s ${FadeIn} ease-in;
  z-index: 1000;
`;

export const ClosedModalButton = styled.button`
  background: none;
  border: none;
  outline: none;
  position: absolute;
  font-size: 1.5rem;
  top: 20px;
  right: 20px;
  height: 24px;
  width: 24px;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: #4a154b;
  }
`;

const TeamListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const TeamListItems = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 2px;
  padding: 15px 10px;
  transition: ease-out background-color 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const MembersModal: React.FC<MembersModalProps> = ({ teamId }) => {
  const { data } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });
  const team = data?.getTeam;

  return (
    <ModalWrapper>
      <PageHeader>{`${team?.users.length} members in ${team?.name}`}</PageHeader>
      <TeamListContainer>
        {team?.users.map((user) => (
          <NextLink
            key={`member-${user.id}`}
            href="/dashboard/[teamId]/user/[userId]"
            as={`/dashboard/${teamId}/user/${user.id}`}
          >
            <TeamListItems>
              <UserIconWrapper>
                <UserIcon>{user.username.charAt(0).toUpperCase()}</UserIcon>
              </UserIconWrapper>
              <h3>{user.username}</h3>
            </TeamListItems>
          </NextLink>
        ))}
      </TeamListContainer>
      <ClosedModalButton>x</ClosedModalButton>
    </ModalWrapper>
  );
};

export default MembersModal;
