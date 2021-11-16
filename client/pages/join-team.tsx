import React, { useEffect } from 'react';
import { withApollo } from '../src/apollo/withApollo';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  useGetAllTeamsLazyQuery,
  useGetMeQuery,
  useJoinTeamMutation,
} from '../src/generated/graphql';
import {
  PageContainer,
  SlackIconStyles,
  PageHeader,
  ErrorMessage,
  InputStyles,
  FormMessage,
  FormMessageLink,
  LogoHeader,
  LogoWrapper,
} from '../components/styles/shared';
import useForm from '../src/utils/useForm';
import {
  TeamListContainer,
  TeamListItems,
} from '../components/styles/JoinTeam';
import SlackIcon from '../asset/slack.svg';

const JoinTeam: React.FC = ({}) => {
  const router = useRouter();
  const { data: userData } = useGetMeQuery();
  const { inputs, handleChange } = useForm({
    name: '',
  });

  const [searchQuery, { data }] = useGetAllTeamsLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [joinTeamMutation, { error: joinTeamError }] = useJoinTeamMutation();

  // FETCH ALL TEAMS ON MOUNT
  useEffect(() => {
    searchQuery({ variables: { searchTeam: '' } });
  }, []);

  // TEAM SEARCH ON INPUT CHANGE
  useEffect(() => {
    const handler = setTimeout(() => {
      searchQuery({ variables: { searchTeam: inputs.name } });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputs.name, searchQuery]);

  const joinTeamHandler = async (teamId: number) => {
    const response = await joinTeamMutation({
      variables: { teamId },
      update: (cache) => {
        cache.evict({ fieldName: 'getUserTeams' });
        cache.evict({ fieldName: 'getMe' });
      },
    }).catch((err) => console.error(err));

    if (!response) {
      return;
    }

    router.push(`/dashboard/${teamId}`);
  };

  const userTeams = userData?.getMe?.teams;
  const allTeams = data?.getAllTeams;

  const uniqueTeams = allTeams?.filter(
    (allTeam) =>
      !userTeams?.find((currentTeam) => allTeam.id === currentTeam.id)
  );

  return (
    <PageContainer>
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader>SlackIt</LogoHeader>
      </LogoWrapper>
      <PageHeader>Join a team today.</PageHeader>
      {joinTeamError && <ErrorMessage>{joinTeamError.message}</ErrorMessage>}
      <InputStyles
        type="search"
        name="name"
        onChange={handleChange}
        placeholder="Search team"
      />
      <TeamListContainer>
        {uniqueTeams?.map((team) => (
          <TeamListItems
            key={`team-${team.id}`}
            onClick={() => joinTeamHandler(team.id)}
          >
            <h3>{team.name}</h3>
            <p>{team.description}</p>
          </TeamListItems>
        ))}
      </TeamListContainer>
      <FormMessage>
        Want to create a team instead?
        <NextLink href="/create-team">
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

export default withApollo({ ssr: true })(JoinTeam);
