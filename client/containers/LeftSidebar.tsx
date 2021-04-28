import React from 'react';
import Teams from '../components/Teams';
import LeftSidebarSections from '../components/LeftSidebarSections';
import { LeftSidebarContainer } from '../components/styles/LeftSidebar';
import { Dispatcher } from '../src/utils/types';
interface SideBarProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>;
  teamId: number;
  channelId: number;
}

export const Sidebar: React.FC<SideBarProps> = ({
  setShowModal,
  teamId,
  channelId,
}) => {
  return (
    <LeftSidebarContainer>
      <Teams teamId={teamId} />
      <LeftSidebarSections
        teamId={teamId}
        channelId={channelId}
        setShowModal={setShowModal}
      />
    </LeftSidebarContainer>
  );
};

export default Sidebar;
