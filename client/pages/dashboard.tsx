import React from 'react';
import { withApollo } from '../src/apollo/client';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Messages from '../components/Messages';
import Members from '../components/Members';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
`

export const Dashboard: React.FC = () => {
    return (
      <DashboardContainer>
        <Sidebar />
        <Messages />
        <Members />
      </DashboardContainer>
    );
}
export default withApollo({ ssr: false })(Dashboard);