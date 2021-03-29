import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import Members from './Members';
import AddChannelModal from './AddChannelModal';
import { DashboardContainer } from './styles';
import { useRouter } from 'next/router';
import { useGetMeQuery } from '../src/generated/graphql';

const DashboardLayout: React.FC = () => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const teamIdQuery = parseInt(router.query.teamId as string);
  const teamId = teamIdQuery ? teamIdQuery : meData?.getMe.teams[0].id;
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <DashboardContainer>
      <Sidebar teamId={teamId} showModal={showModal} setShowModal={setShowModal} />
      <Messages />
      <AddChannelModal teamId={teamId} showModal={showModal} setShowModal={setShowModal} />
      <Members teamId={teamId} />
    </DashboardContainer>
  );
};

export default DashboardLayout;
