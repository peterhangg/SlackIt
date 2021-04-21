import React from 'react';
import styled from 'styled-components';
import {
  useGetMeQuery,
  useGetTeamQuery,
} from '../src/generated/graphql';
import { Dispatcher } from '../src/utils/types';
import TeamHeader from './TeamHeader';
import DirectMessageUsers from './DirectMessageUsers';
import Channels from './Channels';

interface LeftSidebarSectionsProps {
  setShowModal: Dispatcher<boolean>;
  teamId: number;
}

const LeftSidebarSectionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const LeftSidebarSections: React.FC<LeftSidebarSectionsProps> = ({ setShowModal, teamId }) => {
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
      <Channels teamId={teamId} setShowModal={setShowModal} />
      <DirectMessageUsers teamId={teamId} />
    </LeftSidebarSectionContainer>
  );
};

export default LeftSidebarSections;
