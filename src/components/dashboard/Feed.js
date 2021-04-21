import React from 'react';
import { ArrowUpShort } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Loader, LoaderContainer } from '../../styles/reusableStyles';
import { Footer } from '../nav/Footer';
import { FollowContainer } from './FollowsSidebar/FollowContainer';
import { TweetsContainer } from './Tweets/TweetsContainer';

import { WriteTweet } from './WriteTweet';

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Feed = () => {
  const { appIsLoading } = useSelector((state) => state.ui);
  return (
    <>
      {appIsLoading ? (
        <>
          <LoaderContainer>
            <Loader></Loader>
          </LoaderContainer>
        </>
      ) : (
        <>
          <StyledContainer className="animate__animated animate__backInUp">
            <LeftContainerFeed>
              <WriteTweet />
              <TweetsContainer />
            </LeftContainerFeed>
            <RightContainerFeed>
              <FollowContainer />
              <Footer className={`${true ? 'red' : ''}`} />
            </RightContainerFeed>
          </StyledContainer>
          <BackUpButton onClick={handleScrollToTop}>
            <ArrowUpShort />
          </BackUpButton>
        </>
      )}
    </>
  );
};

const backUpAnimation = keyframes`
    0% {
        transform: translate(0, .2rem);
    }
    50%{
        transform: translate(0, -.3rem);
    }
    100%{
        transform: translate(0, .2rem);
    }
    
  `;

const BackUpButton = styled.div`
  margin: auto;
  text-align: center;
  width: 4rem;

  margin-top: 2rem;
  margin-bottom: 2rem;

  background-color: #252525;
  border-radius: 50%;
  cursor: pointer;

  > svg {
    width: 4rem;
    height: 4rem;
    color: #f2f2f2;

    animation: ${backUpAnimation} 2s infinite;
  }

  > p {
    color: white;
    font-size: 1.2rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  padding: 4rem 3rem 0;
  background-color: transparent;
  flex-flow: row nowrap;
  justify-content: center;

  @media (max-width: 760px) {
    flex-direction: column;
    padding: 4rem 0.7rem 0;
  }
`;

const LeftContainerFeed = styled.div`
  flex: 0 1 45rem;
  margin-right: 3rem;

  @media (max-width: 760px) {
    margin-right: 0;
  }

  @media (min-width: 1300px) {
    flex: 0 1 75rem;
  }
`;

const RightContainerFeed = styled.div`
  flex: 0 1 35rem;

  @media (min-width: 1300px) {
    flex: 0 1 45rem;
  }
`;
