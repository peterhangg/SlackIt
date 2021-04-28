import { useRouter } from 'next/router';
import React from 'react';
import { useGetChannelQuery, useGetUserQuery } from '../src/generated/graphql';
import ChannelMessage from '../components/ChannelMessage';
import DirectMessage from '../components/DirectMessage';
import MessageInput from '../components/MessageInput';
import {
  MessageContainer,
  MessageHeaderWrapper,
  MessageHeader,
} from '../components/styles/Messages';

interface MessagesProps {
  channelId: number;
  teamId: number;
}

const Message: React.FC<MessagesProps> = ({ channelId, teamId }) => {
  const router = useRouter();
  const receiverId = parseInt(router.query.userId as string);

  const { data, error } = useGetChannelQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const { data: userData } = useGetUserQuery({
    variables: { userId: receiverId },
    skip: !receiverId,
  });

  if (error) return <div>{error.message}</div>;

  return (
    <MessageContainer>
      <MessageHeaderWrapper>
        {receiverId ? (
          <MessageHeader># {userData?.getUser.username}</MessageHeader>
        ) : (
          <MessageHeader># {data?.getChannel.name}</MessageHeader>
        )}
      </MessageHeaderWrapper>
      {receiverId ? (
        <DirectMessage teamId={teamId} />
      ) : (
        <ChannelMessage channelId={channelId} />
      )}
      <MessageInput
        channelId={channelId}
        channelName={data?.getChannel.name}
        teamId={teamId}
        username={userData?.getUser.username}
      />
    </MessageContainer>
  );
};

export default Message;
