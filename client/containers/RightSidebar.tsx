import React from 'react';
import { Dispatcher } from '../src/utils/types';
import ChannelDescription from '../components/ChannelDescription';
import Members from '../components/Members';
import { RightSidebarContainer } from '../components/styles/RightSidebar';

interface RightSidebarProps {
  teamId: number;
  channelId: number;
  setShowMembersModal: Dispatcher<boolean>;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ teamId, channelId, setShowMembersModal }) => {
  return (
    <RightSidebarContainer>
      <ChannelDescription channelId={channelId} />
      <Members teamId={teamId} setShowMembersModal={setShowMembersModal} />
    </RightSidebarContainer>
  );
};

export default RightSidebar;
