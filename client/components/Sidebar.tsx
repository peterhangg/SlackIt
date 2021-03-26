import React from 'react';
import styled from 'styled-components';
import { useGetUserTeamsQuery } from '../src/generated/graphql';
import Teams from './Teams';
import Channels from './Channels';
import { Dispatcher } from '../src/utils/types';
interface SideBarProps {
  showModal: boolean;
  setShowModal: Dispatcher<boolean>
}

const SidebarStyles = styled.div`
  height: 100%;
  background-color: #763857;
  display: flex;
`;

export const Sidebar: React.FC<SideBarProps> = ({ showModal, setShowModal }) => {
  const { data, loading, error } = useGetUserTeamsQuery();
  if (loading) return null;
  if (error) return <div>{error.message}</div>;
  
  return (
    <SidebarStyles>
      <Teams teams={data?.getUserTeams}/>
      <Channels showModal={showModal} setShowModal={setShowModal} />
    </SidebarStyles>
  );
}

export default Sidebar;