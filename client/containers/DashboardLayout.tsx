import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetMeQuery, useGetTeamQuery } from '../src/generated/graphql';
import { DashboardContainer } from '../components/styles';
import LeftSidebar from './LeftSidebar';
import Message from './Message';
import AddChannelModal from '../components/AddChannelModal';
import RightSidebar from './RightSidebar';
import MembersModal from '../components/MembersModal';

const DashboardLayout: React.FC = () => {
  const router = useRouter();
  const { data: meData, loading } = useGetMeQuery();

  useEffect(() => {
    if (!loading && !meData?.getMe?.teams[0]?.id) {
      router.replace('/create-team');
    }
  }, [loading, meData, router]);

  const teamIdQuery = parseInt(router.query.teamId as string);
  const teamId = teamIdQuery ? teamIdQuery : meData?.getMe?.teams[0]?.id;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMembersModal, setShowMembersModal] = useState<boolean>(false);

  const { data: teamData } = useGetTeamQuery({
    variables: { teamId: teamIdQuery },
    skip: !teamIdQuery,
  });

  const channelIdQuery = parseInt(router.query.channelId as string);
  let channelId = channelIdQuery
    ? channelIdQuery
    : teamIdQuery
    ? teamData?.getTeam?.channels[0].id
    : meData?.getMe?.teams[0]?.channels[0].id;

  return (
    <DashboardContainer>
      <LeftSidebar
        teamId={teamId}
        showModal={showModal}
        setShowModal={setShowModal}
        channelId={channelId}
      />
      <Message channelId={channelId} teamId={teamId} />
      <AddChannelModal
        teamId={teamId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <MembersModal
        teamId={teamId}
        showMembersModal={showMembersModal}
        setShowMembersModal={setShowMembersModal}
      />
      <RightSidebar
        teamId={teamId}
        channelId={channelId}
        setShowMembersModal={setShowMembersModal}
      />
    </DashboardContainer>
  );
};

export default DashboardLayout;
