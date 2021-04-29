import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  JoinedTeamDocument,
  LeftTeamDocument,
  useGetTeamUsersQuery,
} from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import {
  MemberContainer,
  MemberHeader,
  MemberList,
  MemberListItems,
  MemberButton,
} from './styles/member';

interface MembersProps {
  teamId: number;
  setShowMembersModal: Dispatcher<boolean>;
}

export const Members: React.FC<MembersProps> = ({
  teamId,
  setShowMembersModal,
}) => {
  const { data, subscribeToMore } = useGetTeamUsersQuery({
    variables: { teamId },
    skip: !teamId,
  });

  const teamUsers = data?.getTeamUsers;

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
            getTeamUsers: [...prev.getTeamUsers, newMember],
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
            getTeamUsers: prev.getTeamUsers.filter(
              (member) => member.id !== oldMember.id
            ),
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
        {teamUsers?.map((user) => (
          <NextLink
            key={`member-${user.id}`}
            href="/dashboard/[teamId]/user/[userId]"
            as={`/dashboard/${teamId}/user/${user.id}`}
          >
            <MemberListItems>{user.username}</MemberListItems>
          </NextLink>
        ))}
      </MemberList>
      <MemberButton onClick={() => setShowMembersModal(true)}>
        View all members
      </MemberButton>
    </MemberContainer>
  );
};

export default Members;
