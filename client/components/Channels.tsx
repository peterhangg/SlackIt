import React, { useEffect } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import {
  AddedChannelDocument,
  useGetTeamChannelsQuery,
  useGetTeamQuery,
} from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
interface ChannelsProps {
  setShowModal: Dispatcher<boolean>;
  teamId: number;
}

const ChannelContainer = styled.div`
  max-height: 33%;
  color: #e5e5e5;
  overflow-y: auto;
`;

const AddChannelIcon = styled.button`
  font-size: 1rem;
  padding: 2px 5px;
  color: #e5e5e5;
  background-color: #763857;
  border: none;
  margin-right: 1rem;
  border-radius: 3px;
  transition: background-color 0.3s linear, color 0.3s linear;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #763857;
  }
`;

const ChannalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelList = styled.ul`
  width: 100%;
  list-style: none;
`;

const ChannelListItem = styled.li`
  padding: 2px;
  padding-left: 12px;
  color: #e5e5e5;
  &:hover {
    cursor: pointer;
  }
`;

const ChannelListHeader = styled.h4`
  padding-left: 12px;
  font-weight: bold;
  color: #fff;
`;

const Channels: React.FC<ChannelsProps> = ({ setShowModal, teamId }) => {
  const { data, subscribeToMore } = useGetTeamChannelsQuery({
    variables: { teamId },
    skip: !teamId,
  });

  const team = data?.getTeamChannels;

  const showAddChannelModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (teamId) {
      const subscriptionChannelAdded = subscribeToMore({
        document: AddedChannelDocument,
        variables: {
          teamId,
        },
        updateQuery: (prev, res: any) => {
          if (!res.subscriptionData.data) {
            return prev;
          }
          const newChannel = res.subscriptionData.data.addedChannel;
          return {
            ...prev,
            getTeamChannels: [...prev.getTeamChannels, newChannel],
          };
        },
      });

      return () => {
        subscriptionChannelAdded();
      };
    }
  }, [teamId, subscribeToMore]);

  return (
    <ChannelContainer>
      <ChannalHeaderWrapper>
        <ChannelListHeader>Channels</ChannelListHeader>
        <AddChannelIcon onClick={showAddChannelModal}>+</AddChannelIcon>
      </ChannalHeaderWrapper>
      <ChannelList>
        {team?.map((channel) => (
          <NextLink
            key={`channel-${channel.id}`}
            href="/dashboard/[teamId]/[channelId]"
            as={`/dashboard/${teamId}/${channel.id}`}
          >
            <ChannelListItem key={`channel-${channel.id}`}>
              # {channel.name}
            </ChannelListItem>
          </NextLink>
        ))}
      </ChannelList>
    </ChannelContainer>
  );
};

export default Channels;
