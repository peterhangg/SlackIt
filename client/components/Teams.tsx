import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { Team, Channel } from '../src/generated/graphql';

interface TeamsProps {
  teams: Array<
    { __typename?: 'Team' } & Pick<Team, 'id' | 'name'> & {
        channels: Array<
          { __typename?: 'Channel' } & Pick<Channel, 'id' | 'name'>
        >;
      }
  >;
}

const TeamContainer = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-right: 1px solid #d3d3d3;
`;
const TeamList = styled.ul`
  list-style: none;
  width: 100%;
`;

const TeamListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  border: 1px solid#D3D3D3;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1rem;
  transition: background-color 0.3s linear, color 0.3s linear;
  &:hover {
    background-color: #fff;
    color: #763857;
  }
`;

export const Teams: React.FC<TeamsProps> = ({ teams }) => {
  return (
    <TeamContainer>
      <TeamList>
        {teams.map((team) => (
          <NextLink key={`team-${team.id}`} href="/dashboard/[teamId]" as={`/dashboard/${team.id}`}>
            <TeamListItem>
              {team.name.charAt(0)}
            </TeamListItem>
          </NextLink>
        ))}
      </TeamList>
    </TeamContainer>
  );
};

export default Teams;
