import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  EditedMessageDocument,
  NewMessageDocument,
  RemoveMessageDocument,
  TeamNotificationDocument,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetChannelMessagesQuery,
  useGetMeQuery,
} from '../src/generated/graphql';
import { dateFormatter } from '../src/utils/dateFormatter';
import useForm from '../src/utils/useForm';
import { InputStyles, FormStyles } from '../components/styles/shared';

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

const MessageButton = styled.button`
  margin-left: 10px;
  background-color: #fff;
  border: none;
  outline: none;
  &:hover {
    i {
      color: #4a154b;
    }
  }
`;

const MessageButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: 12px;
`;

const ChatMessages: React.FC<ChatMessagesProps> = ({ channelId }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [currentEditMessage, setCurrentEditMessage] = useState<number>(null);
  const { inputs, handleChange } = useForm({
    text: '',
  });
  const { data: meData } = useGetMeQuery();
  const { data, error, subscribeToMore } = useGetChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  // TODO: ERROR MESSAGE
  if (error) return <div>{error.message}</div>;

  const [deleteMessageMutation] = useDeleteMessageMutation();
  const [editMessageMutation] = useEditMessageMutation();

  const handleDelete = async (messageId: number) => {
    const response = await deleteMessageMutation({
      variables: { messageId },
    }).catch((err) => console.error(err));

    if (!response) return;
    return response;
  };

  const toggleEditMessage = (messageId: number, message: string) => {
    if (!openEdit) {
      setCurrentEditMessage(messageId);
      setOpenEdit(true);
      inputs.text = message;
    } else {
      setCurrentEditMessage(null);
      setOpenEdit(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    messageId: number
  ) => {
    e.preventDefault();
    const response = await editMessageMutation({
      variables: { text, messageId },
      update: (cache) => {
        cache.evict({ fieldName: 'getChannelMessages' });
      },
    }).catch((err) => console.error(err));
    if (!response) {
      return;
    }
    setCurrentEditMessage(null);
    setOpenEdit(false);
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

      const subscriptionEditedMessage = subscribeToMore({
        document: EditedMessageDocument,
        variables: {
          channelId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          return {
            ...prev,
            getChannelMessages: [...prev.getChannelMessages]
          };
        },
      });

      return () => {
        subscriptionNewMessage();
        subscriptionTeamNotification();
        subscriptionRemoveMessage();
        subscriptionEditedMessage();
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
                    {message.updatedAt <= message.createdAt
                      ? dateFormatter(message.createdAt)
                      : dateFormatter(message.updatedAt) + ' (edited)'}
                  </MessageMetaDate>
                </MessageAuther>
                {meData?.getMe.id === message.user.id && (
                  <MessageButtonWrapper>
                    <MessageButton
                      onClick={() =>
                        toggleEditMessage(message.id, message.text)
                      }
                    >
                      <i className="fas fa-edit" />
                    </MessageButton>
                    <MessageButton onClick={() => handleDelete(message.id)}>
                      <i className="fas fa-trash" />
                    </MessageButton>
                  </MessageButtonWrapper>
                )}
              </AutherWrapper>
              {(openEdit && currentEditMessage === message.id) ? (
                <FormStyles
                  width="95%"
                  onSubmit={(e) => handleSubmit(e, inputs.text, message.id)}
                >
                  <InputStyles
                    type="text"
                    name="text"
                    value={inputs.text}
                    onChange={handleChange}
                  />
                </FormStyles>
              ) : (
                <p>{message.text}</p>
              )}
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default ChatMessages;
