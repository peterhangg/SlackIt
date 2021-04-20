import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useGetChannelQuery, useGetUserQuery } from '../src/generated/graphql';
import ChatMessages from './ChatMessages';
import DirectMessage from './DirectMessage';
import MessageInput from './MessageInput';

interface MessagesProps {
  channelId: number;
  teamId: number;
}

const MessageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MessageHeaderWrapper = styled.div`
  border-bottom: solid 1px #d3d3d3;
  padding: 1rem;
`;

const MessageHeader = styled.h1`
  font-size: 2rem;
`;

export const Messages: React.FC<MessagesProps> = ({ channelId, teamId }) => {
  const router = useRouter();
  const receiverId = parseInt(router.query.userId as string);

  const { data, error } = useGetChannelQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const { data: userData } = useGetUserQuery({
    variables: { userId: receiverId },
    skip: !receiverId,
  });

  if (error) return <div>{error.message}</div>;

  return (
    <MessageContainer>
      <MessageHeaderWrapper>
        {receiverId ? (
          <MessageHeader># {userData?.getUser.username}</MessageHeader>
        ) : (
          <MessageHeader># {data?.getChannel.name}</MessageHeader>
        )}
      </MessageHeaderWrapper>
      {receiverId ? <DirectMessage /> : <ChatMessages channelId={channelId} />}
      <MessageInput channelId={channelId} channelName={data?.getChannel.name} teamId={teamId} />
    </MessageContainer>
  );
};

export default Messages;
