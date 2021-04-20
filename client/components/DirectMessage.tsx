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
import { useGetDirectMessagesQuery } from '../src/generated/graphql';

interface DirectMessageProps {}

const DirectMessage: React.FC<DirectMessageProps> = ({}) => {
  const router = useRouter();
  const receiverId = parseInt(router.query.userId as string);
  const { data, loading } = useGetDirectMessagesQuery({
    variables: {
      receiverId,
      teamId: 1,
    },
    skip: !receiverId,
  });

  if (loading) return <div>loading...</div>;

  console.log(data);
  return (
    <ChatMessageContainer>
      <MessageList>
        {data?.getDirectMessages.map((directMessage) => (
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
              {directMessage.image && <img src={directMessage.image} alt={directMessage.text} />}
            </MessageWrapper>
          </MessageListItems>
        ))}
      </MessageList>
    </ChatMessageContainer>
  );
};

export default DirectMessage;
