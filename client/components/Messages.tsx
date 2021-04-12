import React from 'react';
import styled from 'styled-components';
import { useGetChannelQuery } from '../src/generated/graphql';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';

interface MessagesProps {
  channelId: number;
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

const ChannelHeader = styled.h1`
  font-size: 2rem;
`;

export const Messages: React.FC<MessagesProps> = ({ channelId }) => {
  const { data, error } = useGetChannelQuery({
    variables: { channelId },
    skip: !channelId,
  });

  if (error) return <div>{error.message}</div>;

  return (
    <MessageContainer>
      <MessageHeaderWrapper>
        <ChannelHeader># {data?.getChannel.name}</ChannelHeader>
      </MessageHeaderWrapper>
      <ChatMessages channelId={channelId} />
      <MessageInput channelId={channelId} channelName={data?.getChannel.name} />
    </MessageContainer>
  );
};

export default Messages;
