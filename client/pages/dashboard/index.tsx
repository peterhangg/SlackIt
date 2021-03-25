import React from 'react';
import { withApollo } from '../../src/apollo/client';
import Sidebar from '../../components/Sidebar';
import Messages from '../../components/Messages';
import Members from '../../components/Members';
import { DashboardContainer } from '../../components/styles';

export const Dashboard: React.FC = () => {
    return (
      <DashboardContainer>
        <Sidebar />
        <Messages />
        <Members />
      </DashboardContainer>
    );
}
export default withApollo({ ssr: true })(Dashboard);