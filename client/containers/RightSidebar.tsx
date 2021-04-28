import React from 'react';
import styled from 'styled-components';
import { Dispatcher } from '../src/utils/types';
import ChannelDescription from '../components/ChannelDescription';
import Members from '../components/Members';

interface LeftSidebarProps {
  teamId: number;
  channelId: number;
  setShowMembersModal: Dispatcher<boolean>;
}

const RightSidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #d3d3d3;
  overflow: hidden;
`;

const RightSidebar: React.FC<LeftSidebarProps> = ({ teamId, channelId, setShowMembersModal }) => {
  return (
    <RightSidebarContainer>
      <ChannelDescription channelId={channelId} />
      <Members teamId={teamId} setShowMembersModal={setShowMembersModal} />
    </RightSidebarContainer>
  );
};

export default RightSidebar;
