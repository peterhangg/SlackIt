import React from 'react';
import styled from 'styled-components';
import { useGetTeamQuery } from '../src/generated/graphql';

interface MembersProps {
  teamId: number;
}

const MemberContainer = styled.div`
  height: 100%;
  border-left: 1px solid #D3D3D3;
  overflow: hidden;
`;

const MemberHeader = styled.h1`
  font-size: 2rem;
  margin-left: 10px;
  margin-top: 1rem;
`;

const MemberList = styled.ul`
  width: 100%;
  list-style: none;
  margin-top: 5px;
  margin-left: 5px;
`;

const MemberListItems = styled.li`
  padding: 4px;
  padding-left: 12px;
`;

export const Members: React.FC<MembersProps> = ({ teamId }) => {
  const { data: teamData, loading, error } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });

  if (loading) return null;
  if (error) return <div>{error.message}</div>;

  const team = teamData?.getTeam;
  
  return (
    <MemberContainer>
      <MemberHeader>Members</MemberHeader>
      <MemberList>
      {team?.users.map((user) => (
        <MemberListItems key={`member-${user.id}`}>
          {user.username}
        </MemberListItems>
      ))}
      </MemberList>
    </MemberContainer>
  );
}

export default Members;