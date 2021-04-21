import {
  H3,
  LeftContainer,
  ProfilePicture,
  RightContainer,
  StyledReplyContainer,
  TopContainer,
  P,
} from '../../../styles/reusableStyles';

import ReactTimeAgo from 'react-time-ago';

export const TweetComment = ({
  name,
  date,
  commentBody,
  repliedTo,
  profilePictureUrl,
}) => {
  return (
    <StyledReplyContainer>
      <LeftContainer>
        <ProfilePicture
          style={{ backgroundImage: `url(${profilePictureUrl})` }}
        >
          {!profilePictureUrl ? name.substr(0, 2) : ''}
        </ProfilePicture>
      </LeftContainer>
      <RightContainer>
        <TopContainer>
          <H3>
            {name} &nbsp;
            <span>
              @ &bull;{' '}
              <ReactTimeAgo locale="en-US" date={new Date(date).getTime()} />
            </span>
            <br />
            <span>In response to {repliedTo}</span>
          </H3>
          <P>{commentBody}</P>
        </TopContainer>
      </RightContainer>
    </StyledReplyContainer>
  );
};
