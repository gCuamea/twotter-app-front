import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { HeaderTop, StyledDashboardBox } from '../../../styles/reusableStyles';
import { User } from './User';

// ? Contenedor derecha, who to follow, currently following
export const FollowContainer = () => {
  const { myFollows, mySuggestedFollows } = useSelector(
    (state) => state.tweets.follows
  );

  if (!myFollows) return <h1>Loading...</h1>;

  return (
    <>
      <StyledFollowContainer>
        <HeaderTop>
          <h3>Who to follow</h3>
        </HeaderTop>
        {}
        {mySuggestedFollows.map((user) => (
          <User key={user.id} followed={false} {...user} />
        ))}
      </StyledFollowContainer>
      <StyledFollowContainer>
        <HeaderTop>
          <h3>Currently following</h3>
        </HeaderTop>
        {myFollows.slice(0, 4).map((user) => (
          <User key={user.id} followed={true} {...user} />
        ))}
      </StyledFollowContainer>
    </>
  );
};

const StyledFollowContainer = styled(StyledDashboardBox)`
  padding: 0;
  overflow: hidden;
`;
