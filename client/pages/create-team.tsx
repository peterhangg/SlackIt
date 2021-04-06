import React from 'react';
import { withApollo } from '../src/apollo/client';
import { useRouter } from 'next/router';
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
const SlackIcon = require('../asset/slack.svg') as string;

const createTeam: React.FC = () => {
  useIsAuthenticated();
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    name: '',
  });
  const [createTeamMutation, { loading, error }] = useCreateTeamMutation({
    variables: inputs as any,
    update: (cache) => {
      cache.evict({ fieldName: 'getUserTeams' });
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

    const createdTeamData = response.data.createTeam;
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
        <ButtonStyle type="submit" disabled={loading}>
          CREATE TEAM
        </ButtonStyle>
      </FormStyles>
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(createTeam);
