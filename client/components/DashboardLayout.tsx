import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import Messages from './Messages';
import AddChannelModal from './AddChannelModal';
import { DashboardContainer } from './styles';
import { useRouter } from 'next/router';
import { useGetMeQuery, useGetTeamQuery } from '../src/generated/graphql';
import RightSidebar from './RightSidebar';

const DashboardLayout: React.FC = () => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const teamIdQuery = parseInt(router.query.teamId as string);
  const teamId = teamIdQuery ? teamIdQuery : meData?.getMe?.teams[0].id;
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: teamData } = useGetTeamQuery({
    variables: { teamId: teamIdQuery },
    skip: !teamIdQuery,
  });

  const channelIdQuery = parseInt(router.query.channelId as string);
  let channelId = channelIdQuery
    ? channelIdQuery
    : teamIdQuery
    ? teamData?.getTeam?.channels[0].id
    : meData?.getMe?.teams[0].channels[0].id;

  return (
    <DashboardContainer>
      <LeftSidebar
        teamId={teamId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Messages channelId={channelId} />
      <AddChannelModal
        teamId={teamId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <RightSidebar teamId={teamId} channelId={channelId} />
    </DashboardContainer>
  );
};

export default DashboardLayout;
