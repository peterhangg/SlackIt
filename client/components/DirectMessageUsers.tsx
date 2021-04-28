import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useDirectMessageUsersQuery } from '../src/generated/graphql';

interface DirectMessageUsersProps {
  teamId: number;
}

const DirectMessageContainer = styled.div`
  margin-top: 2rem;
  max-height: 33%;
  overflow-y: auto;
`;

const DirectMessageList = styled.ul`
  width: 100%;
  list-style: none;
`;

const DirectMessageListItem = styled.li<DirectMessageListItemProps>`
  padding: 2px;
  padding-left: 12px;
  color: #e5e5e5;
  font-weight: ${({ userId }) => (userId ? 'bold' : 'normal')};
  &:hover {
    cursor: pointer;
  }
`;

const DirectMessageHeader = styled.h3`
  padding-left: 12px;
  padding-bottom: 5px;
  font-weight: bold;
  color: #fff;
`;

export interface  DirectMessageListItemProps {
  readonly userId?: boolean;
}

const DirectMessageUsers: React.FC<DirectMessageUsersProps> = ({ teamId }) => {
  const router = useRouter();
  const { data } = useDirectMessageUsersQuery({
    variables: { teamId },
    skip: !teamId
  });
  const userId = parseInt(router.query.userId as string);
  

  return (
    <DirectMessageContainer>
      <DirectMessageHeader>Direct Messages</DirectMessageHeader>
      <DirectMessageList>
        {data?.directMessageUsers.map((user) => (
          <NextLink
            key={`dm-user-${user.id}`}
            href="/dashboard/[teamId]/user/[userId]"
            as={`/dashboard/${teamId}/user/${user.id}`}
          >
            <DirectMessageListItem userId={userId === user.id}>{user.username}</DirectMessageListItem>
          </NextLink>
        ))}
      </DirectMessageList>
    </DirectMessageContainer>
  );
};

export default DirectMessageUsers;
