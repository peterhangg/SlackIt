import React from 'react';
import { useGetChannelQuery } from '../src/generated/graphql';
import { ChannelDescriptionContainer, ChannelDescriptionHeader, ChannelDescriptionStyles } from './styles/Channel';

interface ChannelDescriptionProps {
  channelId: number;
}

const ChannelDescription: React.FC<ChannelDescriptionProps> = ({
  channelId,
}) => {
  const { data: channelData, loading, error } = useGetChannelQuery({
    variables: { channelId },
    skip: !channelId,
  });

  if (loading) return null;
  if (error) return <div>{error.message}</div>;

  return (
    <ChannelDescriptionContainer>
      <ChannelDescriptionHeader>About</ChannelDescriptionHeader>
      <ChannelDescriptionStyles>
        {channelData?.getChannel.description}
      </ChannelDescriptionStyles>
    </ChannelDescriptionContainer>
  );
};

export default ChannelDescription;
