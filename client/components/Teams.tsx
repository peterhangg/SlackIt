import React from 'react';
import NextLink from 'next/link';
import { useGetUserTeamsQuery } from '../src/generated/graphql';
import { TeamContainer, TeamList, TeamListItem } from './styles/Team';

interface TeamsProps {
  teamId: number;
}

export const Teams: React.FC<TeamsProps> = ({ teamId }) => {
  const { data } = useGetUserTeamsQuery();

  return (
    <TeamContainer>
      <TeamList>
        {data?.getUserTeams.map((team) => (
          <NextLink
            key={`team-${team.id}`}
            href="/dashboard/[teamId]"
            as={`/dashboard/${team.id}`}
          >
            <TeamListItem teamId={teamId === team.id}>
              {team.name.charAt(0).toUpperCase()}
            </TeamListItem>
          </NextLink>
        ))}
        <NextLink href="/create-team">
          <TeamListItem>+</TeamListItem>
        </NextLink>
      </TeamList>
    </TeamContainer>
  );
};

export default Teams;
