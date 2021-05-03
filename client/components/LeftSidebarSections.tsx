import React from 'react';
import { useGetMeQuery, useGetTeamQuery } from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import TeamHeader from './TeamHeader';
import DirectMessageUsers from './DirectMessageUsers';
import Channels from './Channels';
import { LeftSidebarSectionContainer } from './styles/LeftSidebarSection';

interface LeftSidebarSectionsProps {
  teamId: number;
  channelId: number;
  setShowModal: Dispatcher<boolean>;
}

export const LeftSidebarSections: React.FC<LeftSidebarSectionsProps> = ({
  teamId,
  channelId,
  setShowModal,
}) => {
  const { data: meData } = useGetMeQuery();
  const { data: teamData } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });
  const team = teamData?.getTeam;

  return (
    <LeftSidebarSectionContainer>
      <TeamHeader
        teamName={team?.name}
        username={meData?.getMe?.username}
        teamId={team?.id}
      />
      <Channels
        teamId={teamId}
        channelId={channelId}
        setShowModal={setShowModal}
      />
      <DirectMessageUsers teamId={teamId} />
    </LeftSidebarSectionContainer>
  );
};

export default LeftSidebarSections;
