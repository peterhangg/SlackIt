import React from 'react';
import styled from 'styled-components';
import Teams from './Teams';
import LeftSidebarSections from './LeftSidebarSections';
import { Dispatcher } from '../src/utils/types';
interface SideBarProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>;
  teamId: number;
}

const LeftSidebarContainer = styled.div`
  height: 100%;
  background-color: #763857;
  display: flex;
`;

export const Sidebar: React.FC<SideBarProps> = ({ setShowModal, teamId }) => {
  return (
    <LeftSidebarContainer>
      <Teams />
      <LeftSidebarSections teamId={teamId} setShowModal={setShowModal} />
    </LeftSidebarContainer>
  );
};

export default Sidebar;
