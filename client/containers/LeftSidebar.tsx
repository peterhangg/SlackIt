import React from 'react';
import styled from 'styled-components';
import Teams from '../components/Teams';
import LeftSidebarSections from '../components/LeftSidebarSections';
import { Dispatcher } from '../src/utils/types';
interface SideBarProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>;
  teamId: number;
  channelId: number;
}

const LeftSidebarContainer = styled.div`
  height: 100%;
  background-color: #763857;
  display: flex;
`;

export const Sidebar: React.FC<SideBarProps> = ({ setShowModal, teamId, channelId }) => {
  return (
    <LeftSidebarContainer>
      <Teams teamId={teamId} />
      <LeftSidebarSections teamId={teamId} channelId={channelId} setShowModal={setShowModal} />
    </LeftSidebarContainer>
  );
};

export default Sidebar;
