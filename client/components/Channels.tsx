import React, { useEffect } from 'react';
import NextLink from 'next/link';
import {
  AddedChannelDocument,
  useGetTeamChannelsQuery,
} from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import { ChannelContainer, ChannalHeaderWrapper, ChannelListHeader, AddChannelIcon, ChannelList, ChannelListItem } from './styles/Channel';
interface ChannelsProps {
  teamId: number;
  channelId: number;
  setShowModal: Dispatcher<boolean>;
}

const Channels: React.FC<ChannelsProps> = ({
  teamId,
  channelId,
  setShowModal,
}) => {
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
            <ChannelListItem
              channelId={channelId === channel.id}
              key={`channel-${channel.id}`}
            >
              # {channel.name}
            </ChannelListItem>
          </NextLink>
        ))}
      </ChannelList>
    </ChannelContainer>
  );
};

export default Channels;
