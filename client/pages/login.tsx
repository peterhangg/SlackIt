import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { withApollo } from '../src/apollo/withApollo';
import {
  GetMeDocument,
  GetMeQuery,
  useLoginMutation,
} from '../src/generated/graphql';
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
  LogoWrapper,
  LogoHeader,
} from '../components/styles/shared';
import { ILogin } from '../src/utils/types';
const SlackIcon = require('../asset/slack.svg') as string;

const Login: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange } = useForm<ILogin>({
    email: '',
    password: '',
  });

  const [loginMutation, { loading, error }] = useLoginMutation({
    variables: inputs,
    update(cache, { data }) {
      cache.writeQuery<GetMeQuery>({
        query: GetMeDocument,
        data: {
          __typename: 'Query',
          getMe: data?.login as any,
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginMutation().catch((err) => console.error(err));
    if (!response) {
      return;
    }
    router.push('/dashboard');
  };

  return (
    <PageContainer>
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader>SlackIt</LogoHeader>
      </LogoWrapper>
      <PageHeader>Sign in to your workspace</PageHeader>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <FormStyles onSubmit={handleSubmit}>
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
          LOGIN
        </ButtonStyle>
      </FormStyles>
      <FormMessage>
        Don't already have an account? {}
        <NextLink href="/register">
          <FormMessageLink>Register.</FormMessageLink>
        </NextLink>
      </FormMessage>
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(Login);
