import React from 'react';
import styled from 'styled-components';

const MemberContainer = styled.div`
  height: 100%;
  border-left: 1px solid #D3D3D3;
`;

export const Members: React.FC = () => {
  return (
    <MemberContainer>
      <h2>Members</h2>
    </MemberContainer>
  );
}

export default Members;