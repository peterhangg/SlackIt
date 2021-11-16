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
  PageHeader,
  FormStyles,
  InputStyles,
  ErrorMessage,
  ButtonStyle,
  FormMessage,
  FormMessageLink,
  LogoHeader,
  LogoWrapper,
} from '../components/styles/shared';
import { ICreateTeam } from '../src/utils/types';
import SlackIcon from '../asset/slack.svg';

const createTeam: React.FC = () => {
  useIsAuthenticated();
  const router = useRouter();
  const { inputs, handleChange } = useForm<ICreateTeam>({
    name: '',
    description: '',
  });
  const [createTeamMutation, { loading, error }] = useCreateTeamMutation({
    variables: inputs,
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
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader>SlackIt</LogoHeader>
      </LogoWrapper>
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
      <FormMessage>
        Want to join an existing team instead?
        <NextLink href="/join-team">
          <FormMessageLink> Click here.</FormMessageLink>
        </NextLink>
      </FormMessage>
      <FormMessage>
        Back to dashboard
        <NextLink href="/dashboard">
          <FormMessageLink> Click here.</FormMessageLink>
        </NextLink>
      </FormMessage>
    </PageContainer>
  );
};

export default withApollo({ ssr: true })(createTeam);
