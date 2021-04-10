import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  NewMessageDocument,
  RemoveMessageDocument,
  TeamNotificationDocument,
  useDeleteMessageMutation,
  useGetChannelMessagesQuery,
  useGetMeQuery,
} from '../src/generated/graphql';
import { dateFormatter } from '../src/utils/dateFormatter';

interface ChatMessagesProps {
  channelId: number;
}

const ChatMessageContainer = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
`;

const MessageList = styled.ul`
  list-style: none;
  display: flex;
  overflow-y: auto;
  flex-direction: column-reverse;
`;

const MessageWrapper = styled.div`
  padding-top: 10px;
  width: 100%;
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

const AutherWrapper = styled.div`
  display: flex;
`;

const MessageAuther = styled.h3`
  padding-bottom: 4px;
`;

const MessageMetaDate = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: #404040;
`;

const UserIconWrapper = styled.div`
  height: 100%;
  padding: 10px;
`;

const DeleteButton = styled.button`
  margin-left: auto;
  margin-right: 12px;
  background-color: #fff;
  border: none;
  outline: none;
  &:hover {
    i {
      color: #4a154b;
    }
  }
`;

const ChatMessages: React.FC<ChatMessagesProps> = ({ channelId }) => {
  const { data: meData } = useGetMeQuery();
  const { data, error, subscribeToMore } = useGetChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  // TODO: ERROR MESSAGE
  if (error) return <div>{error.message}</div>;

  const [deleteMessageMutation] = useDeleteMessageMutation();

  const handleDelete = async (messageId: number) => {
    const response = await deleteMessageMutation({
      variables: { messageId },
    }).catch((err) => console.error(err));

    if (!response) return;
    return response;
  };

  const messages = data?.getChannelMessages || [];

  useEffect(() => {
    if (channelId) {
      const subscriptionNewMessage = subscribeToMore({
        document: NewMessageDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const newMessage = res.subscriptionData.data.newMessage;
          return {
            ...prev,
            getChannelMessages: [...prev.getChannelMessages, newMessage],
          };
        },
      });

      const subscriptionTeamNotification = subscribeToMore({
        document: TeamNotificationDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const newNotification = res.subscriptionData.data.teamNotification;
          return {
            ...prev,
            getChannelMessages: [...prev.getChannelMessages, newNotification],
          };
        },
      });

      const subscriptionRemoveMessage = subscribeToMore({
        document: RemoveMessageDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const removeMessage = res.subscriptionData.data.removeMessage;
          return {
            ...prev,
            getChannelMessages: prev.getChannelMessages.filter(
              (message) => message.id !== removeMessage.id
            ),
          };
        },
      });

      return () => {
        subscriptionNewMessage();
        subscriptionTeamNotification();
        subscriptionRemoveMessage();
      };
    }
  }, [subscribeToMore, channelId]);

  return (
    <ChatMessageContainer>
      <MessageList>
        {messages.map((message) => (
          <MessageListItems key={`message-${message.id}`}>
            <UserIconWrapper>
              <UserIcon>
                {message.user.username.charAt(0).toUpperCase()}
              </UserIcon>
            </UserIconWrapper>
            <MessageWrapper>
              <AutherWrapper>
                <MessageAuther>
                  {message.user.username}
                  <MessageMetaDate>
                    {dateFormatter(message.createdAt)}
                  </MessageMetaDate>
                </MessageAuther>
                {meData?.getMe.id === message.user.id && (
                  <DeleteButton onClick={() => handleDelete(message.id)}>
                    <i className="fas fa-trash" />
                  </DeleteButton>
                )}
              </AutherWrapper>
              <p>{message.text}</p>
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default ChatMessages;
