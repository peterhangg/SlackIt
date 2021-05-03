import React from 'react';
import NavButtons from '../components/NavButtons';
import {
  HomeContainer,
  HomeContent,
  HomeContentWrapper,
} from '../components/styles/Home';
import {
  LogoHeader,
  LogoWrapper,
  SlackIconStyles,
} from '../components/styles/shared';
import { withApollo } from '../src/apollo/withApollo';
const SlackIcon = require('../asset/slack.svg') as string;

const Index = () => {
  return (
    <HomeContainer>
      <LogoWrapper>
        <SlackIconStyles src={SlackIcon} alt="slack icon" />
        <LogoHeader color='var(--white)'>SlackIt</LogoHeader>
      </LogoWrapper>
      <HomeContentWrapper>
        <HomeContent>
          Teamwork can be hard, messy, complicated… and still the best way to
          work. Introducing SlackIt! — a place where people get work done,
          together.
        </HomeContent>
      </HomeContentWrapper>
      <NavButtons />
    </HomeContainer>
  );
};

export default withApollo({ ssr: true })(Index);
