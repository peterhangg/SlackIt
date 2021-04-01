import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  NewMessageDocument,
  useGetChannelQuery,
} from '../src/generated/graphql';
import { timeFormatter } from '../src/utils/timeFormatter';
import MessageInput from './MessageInput';

interface MessagesProps {
  channelId: number;
}

const MessageContainer = styled.div`
  height: 100%;
`;

const MessageList = styled.ul`
  width: 100%;
  height: 90%;
  list-style: none;
  overflow-y: auto;
`;

const MessageHeaderWrapper = styled.div`
  border-bottom: solid 1px #d3d3d3;
  padding: 1rem;
`;

const ChannelHeader = styled.h1`
  font-size: 2rem;
`;

const UserWrapper = styled.div`
  height: 100%;
  padding: 10px;
`;

const MessageWrapper = styled.div`
  padding-top: 10px;
`;

const UserIcon = styled.div`
  font-size: 1.5rem;
  border: 1px solid#D3D3D3;
  border-radius: 10px;
  padding: 7px 10px;
`;

const MessageListItems = styled.li`
  display: flex;
  padding-bottom: 5px;
`;

const MessageAuther = styled.h3`
  padding-bottom: 4px;
`;

const MessageMetaDate = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #404040;
`;

export const Messages: React.FC<MessagesProps> = ({ channelId }) => {
  const { data, error, subscribeToMore } = useGetChannelQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  if (error) return <div>{error.message}</div>;

  const messages = data?.getChannel.messages || [];

  useEffect(() => {
    if (channelId) {
      subscribeToMore({
        document: NewMessageDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          console.log(res);
          if (!res.subscriptionData.data) {
            return prev;
          }
          return {
            ...prev,
            getChannel: {
              ...prev.getChannel,
              messages: [
                ...prev.getChannel.messages,
                res.subscriptionData.data.newMessage,
              ],
            },
          };
        },
      });
    }
  }, [subscribeToMore, channelId]);

  return (
    <MessageContainer>
      <MessageHeaderWrapper>
        <ChannelHeader># {data?.getChannel.name}</ChannelHeader>
      </MessageHeaderWrapper>
      <MessageList>
        {messages.map((message) => (
          <MessageListItems key={`message-${message.id}`}>
            <UserWrapper>
              <UserIcon>
                {message.user.username.charAt(0).toUpperCase()}
              </UserIcon>
            </UserWrapper>
            <MessageWrapper>
              <MessageAuther>
                {message.user.username}
                <MessageMetaDate>
                  {timeFormatter(message.createdAt)}
                </MessageMetaDate>
              </MessageAuther>
              <p>{message.text}</p>
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
      <MessageInput channelId={channelId} channelName={data?.getChannel.name} />
    </MessageContainer>
  );
};

export default Messages;
