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
import { InputStyles, FormStyles } from './styles/shared';
import {
  AuthorWrapper,
  ChannelMessageContainer,
  FetchMessageLoader,
  MessageAuther,
  MessageAvatarStyles,
  MessageAvatarWrapper,
  MessageButton,
  MessageButtonWrapper,
  MessageImg,
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

const ChannelMessage: React.FC<ChatMessagesProps> = ({ channelId }) => {
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
    loading,
    subscribeToMore,
    fetchMore,
  } = useGetChannelMessagesQuery({
    variables: { channelId, limit: 17 },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

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

  // Scroll to bottom on mount / change channels/ new message
  useEffect(() => {
    if (!loading && messages?.length && messageContainerRef) {
      setTimeout(() => {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
        setPrevHeight(messageContainerRef.current.scrollHeight);
      }, 150);
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
          }, 200);
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
    <ChannelMessageContainer ref={messageContainerRef} onScroll={handleScroll}>
      <MessageList>
        {fetchMoreMessages && (
          <FetchMessageLoader>Loading History</FetchMessageLoader>
        )}
        {messages?.map((message) => (
          <MessageListItems key={`message-${message.id}`}>
            {message.user.avatar ? (
              <MessageAvatarWrapper>
                <MessageAvatarStyles
                  src={message.user.avatar}
                  alt="profile avatar"
                />
              </MessageAvatarWrapper>
            ) : (
              <UserIconWrapper>
                <UserIcon>
                  {message.user.username.charAt(0).toUpperCase()}
                </UserIcon>
              </UserIconWrapper>
            )}
            <MessageWrapper>
              <AuthorWrapper>
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
                    {message.text && (
                      <MessageButton
                        onClick={() =>
                          toggleEditMessage(message.id, message.text)
                        }
                      >
                        <i className="fas fa-edit" />
                      </MessageButton>
                    )}
                    <MessageButton onClick={() => handleDelete(message.id)}>
                      <i className="fas fa-trash" />
                    </MessageButton>
                  </MessageButtonWrapper>
                )}
              </AuthorWrapper>
              {openEdit && currentEditMessage === message.id ? (
                <>
                  <FormStyles
                    width="95%"
                    onSubmit={(e) => handleSubmit(e, inputs.text, message.id)}
                  >
                    <InputStyles
                      type="text"
                      name="text"
                      value={inputs.text}
                      onChange={handleChange}
                      width="100%"
                    />
                  </FormStyles>
                  {message.image && (
                    <MessageImg src={message.image} alt={message.text} />
                  )}
                </>
              ) : (
                <>
                  <p>{message.text}</p>
                  {message.image && (
                    <MessageImg src={message.image} alt={message.text} />
                  )}
                </>
              )}
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChannelMessageContainer>
  );
};

export default ChannelMessage;
