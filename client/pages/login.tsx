import React from 'react';
import { useRouter } from 'next/router';
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
  HeaderHero,
  PageHeader,
  HeaderHeroWrapper,
  FormStyles,
  InputStyles,
  ErrorMessage,
  ButtonStyle,
} from '../components/styles/shared';
const SlackIcon = require('../asset/slack.svg') as string;

const Login: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [loginMutation, { loading, error }] = useLoginMutation({
    variables: inputs as any,
    update(cache, { data }) {
      cache.writeQuery<GetMeQuery>({
        query: GetMeDocument,
        data: {
          __typename: 'Query',
          getMe: data?.login,
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
    router.push('/');
  };

  return (
    <PageContainer>
      <HeaderHeroWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <HeaderHero>SlackIt</HeaderHero>
      </HeaderHeroWrapper>
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
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(Login);
