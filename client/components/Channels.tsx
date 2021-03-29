import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useGetMeQuery, useGetTeamQuery } from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';

interface ChannelsProps {
  setShowModal: Dispatcher<boolean>;
}

const ChannelContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  color: #e5e5e5;
`;

const ChannelNameWrapper = styled.div`
  padding: 12px;
  margin-bottom: 2rem;
`;

const UsernameHeader = styled.h3``;

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

const TeamNameHeader = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const ChannelList = styled.ul`
  width: 100%;
  list-style: none;
`;

const ChannelListItem = styled.li`
  padding: 2px;
  padding-left: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const ChannelListHeader = styled.h4`
  padding-left: 12px;
  font-weight: bold;
  color: #fff;
`;

export const Channels: React.FC<ChannelsProps> = ({ setShowModal }) => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const teamIdQuery = parseInt(router.query.teamId as string);
  const teamId = teamIdQuery ? teamIdQuery : meData?.getMe.teams[0].id;
  const { data: teamData, loading, error } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });

  if (loading) return null;
  if (error) return <div>{error.message}</div>;

  const team = teamData.getTeam;
  
  const showAddChannelModal = () => {
    setShowModal(true);
  };

  return (
    <ChannelContainer>
      <ChannelNameWrapper>
        <TeamNameHeader>{team.name}</TeamNameHeader>
        <UsernameHeader>{meData?.getMe.username}</UsernameHeader>
      </ChannelNameWrapper>
      <ChannalHeaderWrapper>
        <ChannelListHeader>Channels</ChannelListHeader>
        <AddChannelIcon onClick={showAddChannelModal}>+</AddChannelIcon>
      </ChannalHeaderWrapper>
      <ChannelList>
        {team.channels.map((channel) => (
          <NextLink
            key={`channel-${channel.id}`}
            href="/dashboard/[teamId]/[channelId]"
            as={`/dashboard/${team.id}/${channel.id}`}
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
