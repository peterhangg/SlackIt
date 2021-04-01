import React from 'react';
import { withApollo } from '../../src/apollo/client';
import DashboardLayout from '../../components/DashboardLayout';

export const Dashboard: React.FC = () => {
    return (
      <DashboardLayout />
    );
}
export default withApollo({ ssr: false })(Dashboard);