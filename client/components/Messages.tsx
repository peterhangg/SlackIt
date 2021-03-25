import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
  useGetChannelMessagesQuery,
  useGetMeQuery,
  useGetTeamQuery,
} from '../src/generated/graphql';

const MessageContainer = styled.div`
  height: 100%;
`;

const MessageList = styled.ul`
  width: 100%;
  list-style: none;
`;

const MessageListItems = styled.li``;

export const Messages: React.FC = () => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const channelIdQuery = parseInt(router.query.channelId as string);
  const teamIdQuery = parseInt(router.query.teamId as string);

  const { data: teamData } = useGetTeamQuery({
    variables: { teamId: teamIdQuery },
    skip: !teamIdQuery,
  });

  let channelId = channelIdQuery
    ? channelIdQuery
    : teamIdQuery
    ? teamData?.getTeam.channels[0].id
    : meData?.getMe.teams[0].channels[0].id;
    
  const { data, loading, error } = useGetChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId
  });

  if (loading) return null;
  if (error) return <div>{error.message}</div>;

  const messages = data?.getChannelMessages || [];

  return (
    <MessageContainer>
      <h2>Messages</h2>
      <MessageList>
        {messages.map((message) => (
          <MessageListItems key={`message-${message.id}`}>
            <h5>{message.user.username}</h5>
            <p>{message.text}</p>
            <p>
              Date:{' '}
              {new Date(Number(message.createdAt)).toLocaleString('en-US', {
                hour: 'numeric',
                hour12: true,
              })}
            </p>
          </MessageListItems>
        ))}
      </MessageList>
    </MessageContainer>
  );
};

export default Messages;
