import React from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { withApollo } from '../../../src/apollo/withApollo';

export const Dashboard: React.FC = () => {
  return <DashboardLayout />;
};

export default withApollo({ ssr: true })(Dashboard);
