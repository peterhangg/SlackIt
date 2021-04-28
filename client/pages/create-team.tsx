import React from 'react';
import { withApollo } from '../src/apollo/withApollo';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useCreateTeamMutation } from '../src/generated/graphql';
import useForm from '../src/utils/useForm';
import { useIsAuthenticated } from '../src/utils/useIsAuthenticated';
import {
  PageContainer,
  SlackIconStyles,
  HeaderHero,
  PageHeader,
  HeaderHeroWrapper,
  FormStyles,
  InputStyles,
  ErrorMessage,
  ButtonStyle,
} from '../components/styles/shared';
import styled from 'styled-components';
const SlackIcon = require('../asset/slack.svg') as string;

const CreateTeamMessage = styled.p`
  color: #3a3b3c;
  margin-top: 12px;
`;

const CreateTeamLink = styled.span`
  font-weight: 700;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const createTeam: React.FC = () => {
  useIsAuthenticated();
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    name: '',
    description: '',
  });
  const [createTeamMutation, { loading, error }] = useCreateTeamMutation({
    variables: inputs as any,
    update: (cache) => {
      cache.evict({ fieldName: 'getUserTeams' });
      cache.evict({ fieldName: 'getMe' });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createTeamMutation().catch((err) =>
      console.error(err)
    );

    if (!response) {
      return;
    }

    const createdTeamData = response?.data.createTeam;
    router.push(`/dashboard/${createdTeamData.id}`);
  };

  return (
    <PageContainer>
      <HeaderHeroWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <HeaderHero>SlackIt</HeaderHero>
      </HeaderHeroWrapper>
      <PageHeader>Create your workplace team</PageHeader>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type="text"
          name="name"
          placeholder="team name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <InputStyles
          type="text"
          name="description"
          placeholder="team description"
          onChange={handleChange}
          value={inputs.description}
          required
        />
        <ButtonStyle type="submit" disabled={loading}>
          CREATE TEAM
        </ButtonStyle>
      </FormStyles>
      <CreateTeamMessage>
        Want to join an existing team instead?
        <NextLink href="/join-team">
          <CreateTeamLink> Click here.</CreateTeamLink>
        </NextLink>
      </CreateTeamMessage>
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(createTeam);
