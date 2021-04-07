import React from 'react';
import { withApollo } from '../src/apollo/client';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styled from 'styled-components';
import {
  PageContainer,
  SlackIconStyles,
  HeaderHero,
  PageHeader,
  HeaderHeroWrapper,
  ErrorMessage,
} from '../components/styles/shared';
import {
  useGetAllTeamsQuery,
  useJoinTeamMutation,
} from '../src/generated/graphql';
const SlackIcon = require('../asset/slack.svg') as string;

const TeamListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 5px;
  min-width: 400px;
  max-height: 600px;
  height: 100%;
`;

const TeamListItems = styled.li`
  width: 100%;
  text-align: center;
  margin-bottom: 2px;
  padding: 15px 10px;
  transition: ease-out background-color 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const CreateTeamMessage = styled.p`
  color: #3A3B3C;
  margin-top: 12px;
`;

const CreateTeamLink = styled.span`
  font-weight: 700;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const JoinTeam: React.FC = ({}) => {
  const router = useRouter();

  const { data } = useGetAllTeamsQuery();
  const [joinTeamMutation, { error: joinTeamError }] = useJoinTeamMutation();

  const joinTeamHandler = async (teamId: number) => {
    const response = await joinTeamMutation({
      variables: { teamId },
      update: (cache) => {
        cache.evict({ fieldName: 'getUserTeams' });
      },
    }).catch((err) => console.error(err));

    if (!response) {
      return;
    }

    router.push(`/dashboard/${teamId}`);
  };

  return (
    <PageContainer>
      <HeaderHeroWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <HeaderHero>SlackIt</HeaderHero>
      </HeaderHeroWrapper>
      <PageHeader>Join a team today.</PageHeader>
      {joinTeamError && <ErrorMessage>{joinTeamError.message}</ErrorMessage>}
      <TeamListContainer>
        {data?.getAllTeams.map((team) => (
          <TeamListItems
            key={`team-${team.id}`}
            onClick={() => joinTeamHandler(team.id)}
          >
            <h3>{team.name}</h3>
            <p>{team.description}</p>
          </TeamListItems>
        ))}
      </TeamListContainer>
      <CreateTeamMessage>
        Want to create a team instead?
        <NextLink href="/create-team">
          <CreateTeamLink> Click here.</CreateTeamLink>
        </NextLink>
      </CreateTeamMessage>
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(JoinTeam);
