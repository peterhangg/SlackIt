import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  JoinedTeamDocument,
  LeftTeamDocument,
  useGetTeamQuery,
} from '../src/generated/graphql';

interface MembersProps {
  teamId: number;
}

const MemberContainer = styled.div`
  height: 50%;
  overflow: hidden;
  padding: 5px;
  overflow-y: auto;
`;

const MemberHeader = styled.h1`
  font-size: 1.75rem;
  margin-left: 10px;
  margin-top: 1rem;
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
`;

export const Members: React.FC<MembersProps> = ({ teamId }) => {
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
      }
    }
  }, [subscribeToMore, teamId]);

  return (
    <MemberContainer>
      <MemberHeader>Members</MemberHeader>
      <MemberList>
        {team?.users.map((user) => (
          <MemberListItems key={`member-${user.id}`}>
            {user.username}
          </MemberListItems>
        ))}
      </MemberList>
    </MemberContainer>
  );
};

export default Members;
