import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  GetMeDocument,
  GetMeQuery,
  useRegisterMutation,
} from '../src/generated/graphql';
import { withApollo } from '../src/apollo/withApollo';
import useForm from '../src/utils/useForm';
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
const SlackIcon = require('../asset/slack.svg') as string;

const Register: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    username: '',
  });

  const [registerMutation, { error, loading }] = useRegisterMutation({
    variables: inputs as any,
    update: (cache, { data }) => {
      cache.writeQuery<GetMeQuery>({
        query: GetMeDocument,
        data: {
          __typename: 'Query',
          getMe: data?.register as any,
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await registerMutation().catch((err) =>
      console.error(err)
    );
    if (!response) {
      return;
    }
    resetForm();
    router.push('/join-team');
  };

  return (
    <PageContainer>
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader>SlackIt</LogoHeader>
      </LogoWrapper>
      <PageHeader>We suggest using your work email address.</PageHeader>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={inputs.username}
          required
        />
        <InputStyles
          type="email"
          name="email"
          placeholder="name@work-email.com"
          onChange={handleChange}
          value={inputs.email}
          required
        />
        <InputStyles
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />
        <ButtonStyle type="submit" disabled={loading}>
          SIGN UP
        </ButtonStyle>
      </FormStyles>
      <FormMessage>
        Already using SlackIt? { }
        <NextLink href="/create-team">
          <FormMessageLink>Login.</FormMessageLink>
        </NextLink>
      </FormMessage>
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(Register);
