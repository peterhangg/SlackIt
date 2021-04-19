import React from 'react';
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
import { FormStyles, InputStyles } from './styles/shared';
import { useGetDirectMessagesQuery } from '../src/generated/graphql';

interface DirectMessageProps {}


const DirectMessage: React.FC<DirectMessageProps> = ({}) => {
  const router = useRouter();
  const receiverId  = parseInt(router.query.userId as string);
  const { data, loading } = useGetDirectMessagesQuery({
    variables: {
      receiverId, 
      teamId: 1
    },
    skip: !receiverId
  });

  if (loading) return <div>loading...</div>

  console.log(data);
  return (
    <ChatMessageContainer>
      <MessageList>
        {data?.getDirectMessages.map((message) => (
          <MessageListItems key={`message-${message.id}`}>
            <UserIconWrapper>
              <UserIcon>
                {message.creator.username.charAt(0).toUpperCase()}
              </UserIcon>
            </UserIconWrapper>
            <MessageWrapper>
              <AutherWrapper>
                <MessageAuther>
                  {message.creator.username}
                  <MessageMetaDate>
                    {dateFormatter(message.createdAt)}
                  </MessageMetaDate>
                </MessageAuther>
              </AutherWrapper>
              <p>{message.text}</p>
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default DirectMessage;
