import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  ChatMessageContainer,
  MessageList,
  MessageListItems,
  UserIconWrapper,
  UserIcon,
  MessageWrapper,
  AutherWrapper,
  MessageAuther,
  MessageMetaDate,
} from './styles/Messages';
import { dateFormatter } from '../src/utils/dateFormatter';
import {
  NewDirectMessageDocument,
  useGetDirectMessagesQuery,
  useGetMeQuery,
} from '../src/generated/graphql';

interface DirectMessageProps {
  teamId: number;
}

const DirectMessage: React.FC<DirectMessageProps> = ({ teamId }) => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const receiverId = parseInt(router.query.userId as string);
  const { data, subscribeToMore } = useGetDirectMessagesQuery({
    variables: {
      receiverId,
      teamId,
    },
    skip: !receiverId,
  });
  const directMessageContainerRef = useRef<HTMLDivElement>(null);

  const directMessages = data?.getDirectMessages;
  const userId = meData?.getMe.id;

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

    return () => {
      subscriptionNewDirectMessage();
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
              <AutherWrapper>
                <MessageAuther>
                  {directMessage.creator.username}
                  <MessageMetaDate>
                    {dateFormatter(directMessage.createdAt)}
                  </MessageMetaDate>
                </MessageAuther>
              </AutherWrapper>
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
