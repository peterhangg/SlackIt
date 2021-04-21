import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ChatMessageContainer,
  MessageList,
  MessageListItems,
  UserIconWrapper,
  UserIcon,
  MessageWrapper,
  AuthorWrapper,
  MessageAuther,
  MessageMetaDate,
  MessageButton,
  MessageButtonWrapper,
} from './styles/Messages';
import { dateFormatter } from '../src/utils/dateFormatter';
import {
  NewDirectMessageDocument,
  RemoveDirectMessageDocument,
  useDeleteDirectMessageMutation,
  useGetDirectMessagesQuery,
  useGetMeQuery,
} from '../src/generated/graphql';

interface DirectMessageProps {
  teamId: number;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ teamId }) => {
  const router = useRouter();
  const directMessageContainerRef = useRef<HTMLDivElement>(null);

  const { data: meData } = useGetMeQuery();
  const receiverId = parseInt(router.query.userId as string);
  const { data, subscribeToMore } = useGetDirectMessagesQuery({
    variables: {
      receiverId,
      teamId,
    },
    skip: !receiverId,
  });
  const [deleteDirectMessageMutation] = useDeleteDirectMessageMutation();

  const directMessages = data?.getDirectMessages;
  const userId = meData?.getMe.id;

  const handleDelete = async (directMessageId: number) => {
    const response = await deleteDirectMessageMutation({
      variables: { directMessageId },
      update: (cache) => {
        cache.evict({ fieldName: 'getDirectMessages' });
      },
    }).catch((err) => console.error(err));

    if (!response) return;
    return response;
  };

  // Scroll to bottom on mount / new direct message
  useEffect(() => {
    if (directMessages?.length && directMessageContainerRef) {
      setTimeout(() => {
        directMessageContainerRef.current.scrollTop =
          directMessageContainerRef.current.scrollHeight;
      }, 50);
    }
  }, [directMessages]);

  useEffect(() => {
    const subscriptionNewDirectMessage = subscribeToMore({
      document: NewDirectMessageDocument,
      variables: {
        userId,
        teamId,
      },
      updateQuery: (prev, res: any) => {
        if (!res.subscriptionData.data) {
          return prev;
        }
        const newDirectMessage = res.subscriptionData.data.newDirectMessage;
        return {
          ...prev,
          getDirectMessages: [...prev.getDirectMessages, newDirectMessage],
        };
      },
    });

    const subscriptionRemoveDirectMessage = subscribeToMore({
      document: RemoveDirectMessageDocument,
      variables: {
        teamId,
        userId,
      },
      updateQuery: (prev, res: any) => {
        if (!res.subscriptionData.data) {
          return prev;
        }
        const removeDirectMessage =
          res.subscriptionData.data.removeDirectMessage;
        return {
          ...prev,
          getDirectMessages: prev.getDirectMessages.filter(
            (directMessage) => directMessage.id !== removeDirectMessage.id
          ),
        };
      },
    });

    return () => {
      subscriptionNewDirectMessage();
      subscriptionRemoveDirectMessage();
    };
  }, [subscribeToMore, teamId]);

  return (
    <ChatMessageContainer ref={directMessageContainerRef}>
      <MessageList>
        {directMessages?.map((directMessage) => (
          <MessageListItems key={`directMessage-${directMessage.id}`}>
            <UserIconWrapper>
              <UserIcon>
                {directMessage.creator.username.charAt(0).toUpperCase()}
              </UserIcon>
            </UserIconWrapper>
            <MessageWrapper>
              <AuthorWrapper>
                <MessageAuther>
                  {directMessage.creator.username}
                  <MessageMetaDate>
                    {dateFormatter(directMessage.createdAt)}
                  </MessageMetaDate>
                </MessageAuther>
                {userId === directMessage.creator.id && (
                  <MessageButtonWrapper>
                    {/* {directMessage.text && (
                      <MessageButton
                        onClick={() =>
                          toggleEditMessage(message.id, message.text)
                        }
                      >
                        <i className="fas fa-edit" />
                      </MessageButton>
                    )} */}
                    <MessageButton
                      onClick={() => handleDelete(directMessage.id)}
                    >
                      <i className="fas fa-trash" />
                    </MessageButton>
                  </MessageButtonWrapper>
                )}
              </AuthorWrapper>
              <p>{directMessage.text}</p>
              {directMessage.image && (
                <img src={directMessage.image} alt={directMessage.text} />
              )}
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default DirectMessage;
