import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useGetMeQuery, useGetTeamQuery } from '../src/generated/graphql';


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

export const Members: React.FC = () => {
  const router = useRouter();
  const { data: meData } = useGetMeQuery();
  const teamIdQuery = parseInt(router.query.teamId as string);
  const teamId = teamIdQuery ? teamIdQuery : meData?.getMe.teams[0].id;
  const { data: teamData, loading, error } = useGetTeamQuery({
    variables: { teamId },
    skip: !teamId,
  });

  if (loading) return null;
  if (error) return <div>{error.message}</div>;

  const team = teamData.getTeam;
  
  return (
    <MemberContainer>
      <MemberHeader>Members</MemberHeader>
      <MemberList>
      {team.users.map((user) => (
        <MemberListItems key={`member-${user.id}`}>
          {user.username}
        </MemberListItems>
      ))}
      </MemberList>
    </MemberContainer>
  );
}

export default Members;