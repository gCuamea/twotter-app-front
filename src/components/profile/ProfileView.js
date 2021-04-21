import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import {
  startFollowUnfollowUser,
  startLoadUserInfo,
} from '../../actions/viewUser';
import {
  Loader,
  LoaderContainer,
  OutlinedButtonPrimary,
  ProfilePicture,
} from '../../styles/reusableStyles';

import { BackspaceFill, EmojiSmile } from 'react-bootstrap-icons';
import { UploadPPictureBox } from './UploadPPictureBox';
import { Tweet } from '../dashboard/Tweets/Tweet';

export const ProfileView = () => {
  const { userId } = useParams();
  const history = useHistory();

  // ? Info load
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadUserInfo(userId));
  }, [dispatch, userId]);

  const { ok, doIFollow, user, tweets } = useSelector(
    (state) => state.viewUser.userInfo
  );
  const { loading } = useSelector((state) => state.viewUser);

  const { uid } = useSelector((state) => state.auth);

  // ? Handlers
  const handleGoBack = () => {
    history.goBack();
  };

  const handleFollow = () => {
    dispatch(startFollowUnfollowUser(userId, doIFollow));
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleShowModal = () => {
    setShowUploadModal(!showUploadModal);
  };

  return (
    <>
      {loading ? (
        <>
          <LoaderContainer>
            <Loader></Loader>
          </LoaderContainer>
        </>
      ) : (
        <ProfilePageContainer className="animate__animated animate__backInUp">
          {ok && (
            <ProfileContainer>
              <TopSection>
                <BigProfilePicture
                  style={{ backgroundImage: `url(${user.profilePictureUrl})` }}
                >
                  {!user.profilePictureUrl ? user.name.substr(0, 2) : ''}
                </BigProfilePicture>
                <NavButtons>
                  <GoBackButton onClick={handleGoBack}>
                    <BackspaceFill /> Go back
                  </GoBackButton>
                  {userId === uid ? (
                    <UploadPPictureContainer>
                      <UploadPPictureButton onClick={handleShowModal}>
                        <EmojiSmile /> Update picture
                      </UploadPPictureButton>

                      {showUploadModal && <UploadPPictureBox />}
                    </UploadPPictureContainer>
                  ) : (
                    <OutlinedButtonPrimary
                      onClick={handleFollow}
                      style={{
                        color: `${doIFollow ? '#35b7bc' : 'white'}`,
                        backgroundColor: `${
                          doIFollow ? 'transparent' : '#35b7bc'
                        }`,
                      }}
                    >
                      {doIFollow ? 'Unfollow' : 'Follow'}
                    </OutlinedButtonPrimary>
                  )}
                </NavButtons>
                <UserStats>
                  <Stat>
                    <h3>{tweets.length}</h3>
                    <p>Tweets</p>
                  </Stat>
                  <Stat>
                    <h3>{user.following.length}</h3>
                    <p>Following</p>
                  </Stat>
                  <Stat>
                    <h3>{user.followers.length}</h3>
                    <p>Followers</p>
                  </Stat>
                </UserStats>
              </TopSection>
              <BottomSection>
                {tweets.map((tweet) => {
                  const tweetMod = { ...tweet };
                  tweetMod.user = tweetMod.user.name;
                  tweetMod.userProfilePicture = tweet.user.profilePictureUrl;
                  return <Tweet key={tweet.id} {...tweetMod} />;
                })}
              </BottomSection>
            </ProfileContainer>
          )}
        </ProfilePageContainer>
      )}
    </>
  );
};

const UploadPPictureContainer = styled.div`
  position: relative;
`;

const UploadPPictureButton = styled.button`
  border: none;
  padding: 0.7rem 1.6rem;
  background-color: #f9990b;
  cursor: pointer;
  font-size: 1.3rem;
  border-radius: 15px;

  display: flex;
  align-items: center;
  color: white;
  font-weight: 700;
  margin-right: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;

  > svg {
    margin-right: 0.5rem;
  }
`;

const ProfilePageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  margin-top: 5rem;

  display: flex;
  justify-content: center;
`;
const ProfileContainer = styled.div`
  margin-top: 3rem;

  background-color: white;
  border-radius: 20px;
  border: 1px solid #b9b0b0;
  overflow: hidden;
  width: 50rem;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  padding-top: 0;
`;

const BigProfilePicture = styled(ProfilePicture)`
  position: absolute;
  top: 2rem;
  left: 50%;
  font-size: 3.5rem;

  transform: translate(-50%, -50%);
  width: 11rem;
  height: 11rem;
`;

const TopSection = styled.div`
  padding: 2rem 0 1.5rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #c8c8c8;
`;
const BottomSection = styled.div`
  min-height: 10rem;
`;

const UserStats = styled.div`
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-right: 1rem;
  }
`;

const Stat = styled.div`
  text-align: left;
  padding: 0 4rem;
  width: 15rem;
  > h3 {
    font-size: 3rem;
    line-height: 1.4;
  }

  > p {
    font-size: 2rem;
  }
`;

const GoBackButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #9b9b9b;
  padding: 0.5rem 1rem;
  width: 10rem;
  justify-content: space-between;
  cursor: pointer;

  font-size: 1.5rem;
`;
