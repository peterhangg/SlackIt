import React from 'react';
import styled from 'styled-components';
import { useGetUserTeamsQuery } from '../src/generated/graphql';
import Teams from './Teams';

const SidebarStyles = styled.div`
  height: 100%;
  background-color: #763857;
`;

export const Sidebar: React.FC = () => {
  const { data, loading, error } = useGetUserTeamsQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    <SidebarStyles>
      <Teams teams={data.getUserTeams}/>
    </SidebarStyles>
  );
}

export default Sidebar;