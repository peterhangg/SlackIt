import React, { useEffect, useRef, useState } from 'react';
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
import {
  AutherWrapper,
  ChatMessageContainer,
  FetchMessageLoader,
  MessageAuther,
  MessageButton,
  MessageButtonWrapper,
  MessageList,
  MessageListItems,
  MessageMetaDate,
  MessageWrapper,
  UserIcon,
  UserIconWrapper,
} from './styles/Messages';

interface ChatMessagesProps {
  channelId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ channelId }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [currentEditMessage, setCurrentEditMessage] = useState<number>(null);
  const [prevHeight, setPrevHeight] = useState<number>(null);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(false);
  const [fetchMoreMessages, setFetchMoreMessages] = useState<boolean>(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { inputs, handleChange } = useForm({
    text: '',
  });
  const { data: meData } = useGetMeQuery();
  const {
    data,
    error,
    subscribeToMore,
    fetchMore,
  } = useGetChannelMessagesQuery({
    variables: { channelId, limit: 17 },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  // TODO: ERROR MESSAGE
  if (error) return <div>{error.message}</div>;

  const [deleteMessageMutation] = useDeleteMessageMutation();
  const [editMessageMutation] = useEditMessageMutation();

  const messages = data?.getChannelMessages.messages;
  const hasMore = data?.getChannelMessages.hasMore;

  const handleDelete = async (messageId: number) => {
    const response = await deleteMessageMutation({
      variables: { messageId },
      update: (cache) => {
        cache.evict({ fieldName: 'getChannelMessages' });
      },
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

  useEffect(() => {
    hasMore ? setHasMoreMessages(true) : setHasMoreMessages(false);
  }, [data]);

  // Scroll to bottom on mount/change channels
  useEffect(() => {
    if (messages?.length && messageContainerRef) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
      setPrevHeight(messageContainerRef.current.scrollHeight);
    }
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    if (
      messageContainerRef &&
      e.currentTarget.scrollTop === 0 &&
      hasMoreMessages
    ) {
      setFetchMoreMessages(true);
      fetchMore({
        variables: {
          channelId,
          limit: 20,
          cursor: messages[messages.length - 1].createdAt,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          if (fetchMoreResult.getChannelMessages.messages.length < 18) {
            setHasMoreMessages(false);
          }
          return {
            ...prevResult,
            getChannelMessages: {
              ...prevResult.getChannelMessages,
              messages: [
                ...prevResult.getChannelMessages.messages,
                ...fetchMoreResult.getChannelMessages.messages,
              ],
            },
          };
        },
      }).then(({ data }) => {
        if (data.getChannelMessages) {
          setTimeout(() => {
            messageContainerRef.current.scrollTop =
              messageContainerRef.current.scrollHeight - prevHeight;
          }, 100);
        }
        setFetchMoreMessages(false);
      });
    }
  };

  // MESSAGE SUBSCRIPTIONS
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
            getChannelMessages: {
              ...prev.getChannelMessages,
              messages: [...prev.getChannelMessages.messages, newMessage],
            },
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
            getChannelMessages: {
              ...prev.getChannelMessages,
              messages: [...prev.getChannelMessages.messages, newNotification],
            },
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
            getChannelMessages: {
              ...prev.getChannelMessages,
              messages: prev.getChannelMessages.messages.filter(
                (message) => message.id !== removeMessage.id
              ),
            },
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
            getChannelMessages: {
              ...prev.getChannelMessages,
              messages: [...prev.getChannelMessages.messages],
            },
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
    <ChatMessageContainer ref={messageContainerRef} onScroll={handleScroll}>
      <MessageList>
        {fetchMoreMessages && (
          <FetchMessageLoader>Loading History</FetchMessageLoader>
        )}
        {messages?.map((message) => (
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
              {openEdit && currentEditMessage === message.id ? (
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
