import React from 'react';
import useForm from '../src/utils/useForm';
import { useRouter } from 'next/router';
import {
  GetMeDocument,
  GetMeQuery,
  useRegisterMutation,
} from '../src/generated/graphql';
import { withApollo } from '../src/apollo/client';
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
          getMe: data?.register,
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
    router.push('/');
  };

  return (
    <PageContainer>
      <HeaderHeroWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <HeaderHero>SlackIt</HeaderHero>
      </HeaderHeroWrapper>
      <PageHeader>Register today! We suggest using your work email address.</PageHeader>
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
    </PageContainer>
  );
};

export default withApollo({ ssr: false })(Register);
