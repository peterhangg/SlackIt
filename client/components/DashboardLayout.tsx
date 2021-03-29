import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';
import Members from './Members';
import AddChannelModal from './AddChannelModal';
import { DashboardContainer } from './styles';

const DashboardLayout: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <DashboardContainer>
      <Sidebar showModal={showModal} setShowModal={setShowModal} />
      <Messages />
      <AddChannelModal showModal={showModal} setShowModal={setShowModal} />
      <Members />
    </DashboardContainer>
  );
};

export default DashboardLayout;
