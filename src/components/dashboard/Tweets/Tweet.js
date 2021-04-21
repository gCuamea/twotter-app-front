import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TweetComment } from './TweetComment';
import { ReplyBox } from './ReplyBox';
import { startLikeTweet, startRtTweet } from '../../../actions/tweets';
import {
  LeftContainer,
  RightContainer,
  ProfilePicture,
  TopContainer,
  H3,
} from '../../../styles/reusableStyles';
import {
  ChatDots,
  ArrowLeftRight,
  Heart,
  BoxArrowUp,
  Arrow90degRight,
} from 'react-bootstrap-icons';

// ? Image Lightbox
import Lightbox from 'react-modal-image/lib/Lightbox';

// ? TimeAgo Init
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

export const Tweet = ({
  body,
  creationDate: date,
  id,
  likes,
  retweets,
  user,
  comments,
  imgUrl,
  userId,
  userProfilePicture,
  lastRtBy,
}) => {
  const dispatch = useDispatch();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const { name: myName, uid } = useSelector((state) => state.auth);

  // ? Ui likes/rts counter
  const [likesQty, setLikesQty] = useState({
    likesQty: likes.length,
    liked: !!likes.find((like) => like.uid === uid),
  });

  const [rtQty, setRtQty] = useState({
    rtQty: retweets.length,
    rtweeted: !!retweets.find((retweet) => retweet.uid === uid),
  });

  // ? Handlers
  const handleLike = () => {
    dispatch(startLikeTweet(id));
    setLikesQty({
      likesQty: likesQty.liked ? likesQty.likesQty - 1 : likesQty.likesQty + 1,
      liked: !likesQty.liked,
    });
  };

  const handleRetweet = () => {
    dispatch(startRtTweet(id));
    setRtQty({
      rtQty: rtQty.rtweeted ? rtQty.rtQty - 1 : rtQty.rtQty + 1,
      rtweeted: !rtQty.rtweeted,
    });
  };

  const handleComments = () => {
    setShowCommentModal(!showCommentModal);
  };

  const handleShowModal = () => {
    setShowImgModal(!showImgModal);
  };

  return (
    <StyledTweet className="animate__animated animate__fadeInLeft">
      {lastRtBy && (
        <RtByBox className="animate__animated animate__fadeInUp">
          <Arrow90degRight />
          <Link to={`/user/${lastRtBy._id}`}>Retweeted by {lastRtBy.name}</Link>
        </RtByBox>
      )}
      <LeftContainer>
        <ProfilePicture
          style={{ backgroundImage: `url(${userProfilePicture})` }}
        >
          {!userProfilePicture ? user.substr(0, 2) : ''}
        </ProfilePicture>
      </LeftContainer>
      <RightContainer>
        <TopContainer>
          <H3>
            <Link to={`/user/${userId}`}>{user}</Link>
            <span>
              <Link to={`/user/${userId}`}>
                @{user} &bull;{' '}
                <ReactTimeAgo locale="en-US" date={new Date(date)} />
              </Link>
            </span>
          </H3>
          <P>{body}</P>
          {imgUrl && (
            <>
              <ImgContainer
                onClick={handleShowModal}
                src={imgUrl}
                alt="TweetPhoto"
              />

              {showImgModal && (
                <Lightbox
                  small={imgUrl}
                  medium={imgUrl}
                  large={imgUrl}
                  onClose={handleShowModal}
                />
              )}
            </>
          )}
        </TopContainer>
        <BottomContainer>
          <Social onClick={handleComments}>
            <div>
              <ChatDots />
            </div>
            <P>{comments.length > 0 && comments.length}</P>
          </Social>
          <Social onClick={handleRetweet}>
            <div>
              <ArrowLeftRight color={rtQty.rtweeted ? '#51cc06' : '#3c4460'} />
            </div>
            <P>{rtQty.rtQty > 0 && rtQty.rtQty}</P>
          </Social>
          <Social onClick={handleLike}>
            <div>
              <Heart color={likesQty.liked ? '#f92237' : '#3c4460'} />
            </div>

            <P>{likesQty.likesQty > 0 && likesQty.likesQty}</P>
          </Social>
          <Social>
            <div>
              <BoxArrowUp />
            </div>
          </Social>
        </BottomContainer>
      </RightContainer>
      {showCommentModal && (
        <RepliesContainer className="animate__animated animate__fadeInLeft">
          {comments.map((comment) => (
            <TweetComment key={comment.id} {...comment} repliedTo={user} />
          ))}
          <ReplyBox myName={myName} twId={id} />
        </RepliesContainer>
      )}
    </StyledTweet>
  );
};

// const StyledTweet = styled(StyledTweetsContainer)``;
const StyledTweet = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px ${(props) => props.theme.primaryColorLight} solid;
  flex-flow: row wrap;

  /*  &:last-of-type {
    padding: 5rem;
    border-bottom: 3px solid red;
  } */

  transition: all 0.2s;
`;

const RtByBox = styled.div`
  width: 100%;
  margin-left: 2.7rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #646464;

  display: flex;
  align-items: center;

  > svg {
    color: green;
    font-size: 1.5rem;
  }

  > a {
    margin-left: 1rem;
    display: inline;
    text-decoration: none;
    color: currentColor;
  }
`;

const RepliesContainer = styled.div`
  width: 100%;
  padding-top: 2.2rem;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-right: 6rem;
`;

const P = styled.p`
  font-size: 1.5rem;
  color: #3c4460;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  width: 5rem;

  > div {
    width: 2.9rem;
    height: 2.9rem;
    border-radius: 50%;
    position: relative;

    > svg {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      height: 2rem;
      width: 2rem;

      transition: all 0.3s ease;
      margin-right: 1rem;
      cursor: pointer;
    }
  }

  > p {
    margin-left: 0.6rem;
    font-size: 1.3rem;
  }
`;

const ImgContainer = styled.img`
  display: block;
  cursor: pointer;

  margin-top: 1.3rem;
  width: 100%;
  height: 20vw;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.2s ease;

  @media (max-width: 760px) {
    height: 40vw;
  }
`;
