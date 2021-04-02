import React from 'react';
import styled from 'styled-components';
import ChannelDescription from './ChannelDescription';
import Members from './Members';

interface LeftSidebarProps {
  teamId: number;
  channelId: number;
}

const RightSidebarContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #d3d3d3;
  overflow: hidden;
`;

const RightSidebar: React.FC<LeftSidebarProps> = ({ teamId, channelId }) => {
  return (
    <RightSidebarContainer>
      <ChannelDescription channelId={channelId} />
      <Members teamId={teamId} />
    </RightSidebarContainer>
  );
};

export default RightSidebar;
