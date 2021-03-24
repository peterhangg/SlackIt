import React from 'react';
import styled from 'styled-components';

const SidebarStyles = styled.div`
  height: 100%;
  background-color: #763857;
`

export const Sidebar: React.FC = () => {
    return (
      <SidebarStyles>
        <h2>Team & Channel</h2>
      </SidebarStyles>
    );
}

export default Sidebar;