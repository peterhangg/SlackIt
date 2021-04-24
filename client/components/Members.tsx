import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import {
  JoinedTeamDocument,
  LeftTeamDocument,
  useGetTeamQuery,
} from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';

interface MembersProps {
  teamId: number;
  setShowMembersModal: Dispatcher<boolean>;
}

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  align-items: center;
  padding: 5px;
  overflow: hidden;
  overflow-y: auto;
`;

const MemberHeader = styled.h1`
  font-size: 1.75rem;
  margin-left: 10px;
  margin-top: 1rem;
  margin-right: auto;
`;

const MemberList = styled.ul`
  width: 100%;
  list-style: none;
  margin-top: 5px;
  margin-left: 5px;
`;

const MemberListItems = styled.li`
  padding: 4px;
  padding-left: 12px;
  cursor: pointer;
`;

const MemberButton = styled.button`
  width: 90%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 2rem;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: #4a154b;
    color: #fff;
  }
`;

export const Members: React.FC<MembersProps> = ({ teamId, setShowMembersModal }) => {
  const { data: teamData, error, subscribeToMore } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });

  if (error) return <div>{error.message}</div>;
  const team = teamData?.getTeam;

  useEffect(() => {
    if (teamId) {
      const subscriptionJoinedUser = subscribeToMore({
        document: JoinedTeamDocument,
        variables: {
          teamId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const newMember = res.subscriptionData.data.joinedTeam;
          return {
            ...prev,
            getTeam: {
              ...prev.getTeam,
              users: [...prev.getTeam.users, newMember],
            },
          };
        },
      });

      const subscriptionLeftTeam = subscribeToMore({
        document: LeftTeamDocument,
        variables: {
          teamId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const oldMember = res.subscriptionData.data.leftTeam;
          return {
            ...prev,
            getTeam: {
              ...prev.getTeam,
              users: prev.getTeam.users.filter(
                (member) => member.id !== oldMember.id
              ),
            },
          };
        },
      });

      return () => {
        subscriptionJoinedUser();
        subscriptionLeftTeam();
      };
    }
  }, [subscribeToMore, teamId]);

  return (
    <MemberContainer>
      <MemberHeader>Members</MemberHeader>
      <MemberList>
        {team?.users.map((user) => (
          <NextLink
            key={`member-${user.id}`}
            href="/dashboard/[teamId]/user/[userId]"
            as={`/dashboard/${team.id}/user/${user.id}`}
          >
            <MemberListItems>{user.username}</MemberListItems>
          </NextLink>
        ))}
      </MemberList>
      <MemberButton onClick={() => setShowMembersModal(true)}>View all members</MemberButton>
    </MemberContainer>
  );
};

export default Members;
