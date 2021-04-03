import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  NewMessageDocument,
  useGetChannelMessagesQuery,
} from '../src/generated/graphql';
import { timeFormatter } from '../src/utils/timeFormatter';

interface ChatMessagesProps {
  channelId: number;
}

const ChatMessageContainer = styled.div`
  width: 100%;
  height: 90%;
`;

const MessageList = styled.ul`
  list-style: none;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
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

const UserWrapper = styled.div`
  height: 100%;
  padding: 10px;
`;

const ChatMessages: React.FC<ChatMessagesProps> = ({ channelId }) => {
  const { data, error, subscribeToMore } = useGetChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  if (error) return <div>{error.message}</div>;

  const messages = data?.getChannelMessages || [];

  useEffect(() => {
    if (channelId) {
      const subscriptionMessage = subscribeToMore({
        document: NewMessageDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          return {
            ...prev,
            getChannelMessages: [
              ...prev.getChannelMessages,
              res.subscriptionData.data.newMessage,
            ],
          };
        },
      });

      return () => subscriptionMessage();
    }
  }, [subscribeToMore, channelId]);

  return (
    <ChatMessageContainer>
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
    </ChatMessageContainer>
  );
};

export default ChatMessages;
