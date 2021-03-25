import React from 'react';
import styled from 'styled-components';
import { useGetUserTeamsQuery } from '../src/generated/graphql';
import Teams from './Teams';
import Channels from './Channels';

const SidebarStyles = styled.div`
  height: 100%;
  background-color: #763857;
  display: flex;
`;

export const Sidebar: React.FC = () => {
  const { data, loading, error } = useGetUserTeamsQuery();
  if (loading) return null;
  if (error) return <div>{error.message}</div>;
  
  return (
    <SidebarStyles>
      <Teams teams={data?.getUserTeams}/>
      <Channels />
    </SidebarStyles>
  );
}

export default Sidebar;