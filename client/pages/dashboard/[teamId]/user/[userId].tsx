import React from 'react';
import DashboardLayout from '../../../../containers/DashboardLayout';
import { withApollo } from '../../../../src/apollo/withApollo';
import { useIsAuthenticated } from '../../../../src/utils/useIsAuthenticated';

export const DirectMessageDashboard: React.FC = ({}) => {
  useIsAuthenticated();
  return <DashboardLayout />;
};

export default withApollo({ ssr: true })(DirectMessageDashboard);
