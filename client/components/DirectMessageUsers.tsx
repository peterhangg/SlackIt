import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
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

const DirectMessageListItem = styled.li`
  padding: 2px;
  padding-left: 12px;
  color: #e5e5e5;
  &:hover {
    cursor: pointer;
  }
`;

const DirectMessageHeader = styled.h4`
  padding-left: 12px;
  padding-bottom: 5px;
  font-weight: bold;
  color: #fff;
`;

const DirectMessageUsers: React.FC<DirectMessageUsersProps> = ({ teamId }) => {
  const { data } = useDirectMessageUsersQuery({
    variables: { teamId },
    skip: !teamId
  });

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
            <DirectMessageListItem>{user.username}</DirectMessageListItem>
          </NextLink>
        ))}
      </DirectMessageList>
    </DirectMessageContainer>
  );
};

export default DirectMessageUsers;
