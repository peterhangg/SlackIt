import React from 'react';
import NavButtons from '../components/NavButtons';
import styled from 'styled-components';
import { withApollo } from '../src/apollo/client';
const ChatBot = require('../asset/chat.svg') as string;
const SlackIcon = require('../asset/slack.svg') as string;

const IndexContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 10px;
  margin: auto;
  height: 100vh;
  overflow: hidden;
  position: relative;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  height: 50%;
`;

const HeadlineWrapper = styled.div`
  width: 30%;
`;

const SlackIconStyles = styled.img`
  margin-right: 0.5rem;
`;

const HeaderHero = styled.h1`
  font-size: 4rem;
  color: #fff;
`;

const HeaderHeroWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.p`
  color: #fff;
  font-size: 1.25rem;
  margin-top: 0.75rem;
`;

const ImageWrapper = styled.div`
  top: 10%;
  position: relative;
  width: 35%;

  img {
    width: 100%;
  }
`;

const Index = () => {
  return (
    <IndexContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#763857"
          fillOpacity="1"
          d="M0,160L80,154.7C160,149,320,139,480,149.3C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <HeaderWrapper>
        <HeadlineWrapper>
          <HeaderHeroWrapper>
            <SlackIconStyles src={SlackIcon} alt="slack icon" />
            <HeaderHero>SlackIt</HeaderHero>
          </HeaderHeroWrapper>
          <HeaderContent>
            Teamwork can be hard, messy, complicated… and still the best way to
            work. Introducing SlackIt! — a place where people get work done,
            together.
          </HeaderContent>
        </HeadlineWrapper>
        <ImageWrapper>
          <img src={ChatBot} alt="chat bot icon" />
        </ImageWrapper>
      </HeaderWrapper>
      <NavButtons />
    </IndexContainer>
  );
};

export default withApollo({ ssr: true })(Index);
