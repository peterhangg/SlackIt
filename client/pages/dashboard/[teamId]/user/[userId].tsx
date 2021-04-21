import React from 'react';
import DashboardLayout from '../../../../components/DashboardLayout';
import { withApollo } from '../../../../src/apollo/withApollo';

interface DirectMessageDashboardProps {}

export const DirectMessageDashboard: React.FC = ({}) => {
  return <DashboardLayout />;
};

export default withApollo({ ssr: true })(DirectMessageDashboard);
