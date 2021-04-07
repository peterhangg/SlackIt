import React from 'react';
import { withApollo } from '../../src/apollo/client';
import DashboardLayout from '../../components/DashboardLayout';
import { useIsAuthenticated } from '../../src/utils/useIsAuthenticated';

export const Dashboard: React.FC = () => {
  useIsAuthenticated();
  
  return (
    <DashboardLayout />
  );
}
export default withApollo({ ssr: false })(Dashboard);