import React from 'react';
import styled from 'styled-components';
import { useGetChannelQuery } from '../src/generated/graphql';

interface ChannelDescriptionProps {
  channelId: number;
}

const ChannelDescriptionContainer = styled.div`
  padding: 0 5px 5px 5px;
`;

const ChannelDescriptionHeader = styled.h1`
  font-size: 1.75rem;
  margin-left: 10px;
  margin-top: 1rem;
`;

const ChannelDescriptionStyles = styled.p`
  padding: 4px;
  padding-left: 12px;
`;

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
