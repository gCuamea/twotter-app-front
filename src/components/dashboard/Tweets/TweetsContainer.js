import React, { useEffect, useRef } from 'react';
import { Disc, EmojiSmile } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { startGettingMoreTweets } from '../../../actions/tweets';

import {
  HeaderTop,
  StyledDashboardBox,
  StyledPrimaryButton,
} from '../../../styles/reusableStyles';

import { Tweet } from './Tweet';

export const TweetsContainer = () => {
  const dispatch = useDispatch();
  const { feed, currentlyLoadingMoreTweets, endOfFeed } = useSelector(
    (state) => state.tweets
  );
  const containerRef = useRef(null);

  const handleGetMoreTweetsButton = () => {
    dispatch(startGettingMoreTweets());
  };

  useEffect(() => {
    const getMoreTweets = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !currentlyLoadingMoreTweets && !endOfFeed)
        dispatch(startGettingMoreTweets());
    };
    const observer = new IntersectionObserver(getMoreTweets, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    });
    if (containerRef.current && feed.length > 0)
      observer.observe(containerRef.current);
  }, [containerRef, feed, currentlyLoadingMoreTweets, dispatch, endOfFeed]);

  return (
    <>
      <StyledTweetsContainer>
        <HeaderTop>
          <h3>Feed</h3>
        </HeaderTop>

        {feed.map((tweet) => {
          const tweetMod = { ...tweet };
          tweetMod.userId = tweetMod.user._id;
          tweetMod.user = tweetMod.user.name;
          tweetMod.userProfilePicture = tweet.user.profilePictureUrl;
          return <Tweet key={tweet.id} {...tweetMod} />;
        })}
        <div>
          {!endOfFeed && (
            <StyledGetTweetsButton onClick={handleGetMoreTweetsButton}>
              Load more tweets
            </StyledGetTweetsButton>
          )}
          {currentlyLoadingMoreTweets && (
            <SpinnerContainer className="animate__animated animate__fadeIn">
              <Disc />
              <p>Loading more tweets...</p>
            </SpinnerContainer>
          )}
          {(endOfFeed || feed.length === 0) && (
            <FeedEndContainer className="animate__animated animate__fadeInUp">
              <EmojiSmile />
              <p>Reached the end of your feed, try following more people!</p>
            </FeedEndContainer>
          )}
        </div>
      </StyledTweetsContainer>
      {!currentlyLoadingMoreTweets && (
        <LoadMoreTweetsObserver ref={containerRef}></LoadMoreTweetsObserver>
      )}
    </>
  );
};

const StyledGetTweetsButton = styled(StyledPrimaryButton)`
  margin-bottom: 0;
  display: none;

  @media (max-width: 760px) {
    display: block;
  }
`;

const StyledTweetsContainer = styled(StyledDashboardBox)`
  padding: 0;
  margin: 0;
  overflow: hidden;

  & > *:nth-last-child(2) {
    border-bottom: 0;
  }

  @media (max-width: 760px) {
    margin-bottom: 2rem;
  }
`;
const LoadMoreTweetsObserver = styled.div`
  @media (max-width: 760px) {
    display: none;
  }
`;

const circularAnimation = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  > p {
    font-size: 1.3rem;
  }

  > svg {
    width: 4rem;
    height: 4rem;
    animation-name: ${circularAnimation};
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    fill: #6a6a6a;
  }
`;

const FeedEndContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 0;
  > p {
    font-size: 1.3rem;
  }
  > svg {
    width: 4rem;
    height: 4rem;
    fill: #6a6a6a;
  }
`;
