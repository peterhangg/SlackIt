import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useDirectMessageUsersQuery } from '../src/generated/graphql';
import { DirectMessageContainer, DirectMessageHeader, DirectMessageList, DirectMessageListItem } from './styles/DirectMessageUsers';

interface DirectMessageUsersProps {
  teamId: number;
}

const DirectMessageUsers: React.FC<DirectMessageUsersProps> = ({ teamId }) => {
  const router = useRouter();
  const { data, subscribeToMore } = useDirectMessageUsersQuery({
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
