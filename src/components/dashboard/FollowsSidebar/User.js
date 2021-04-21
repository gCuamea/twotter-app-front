import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { startFollowing } from '../../../actions/tweets';
import {
  LeftContainer,
  RightContainer,
  ProfilePicture,
  OutlinedButtonPrimary,
  H3,
} from '../../../styles/reusableStyles';

export const User = ({
  followed,
  id,
  name,
  followersQty,
  followingQty,
  profilePictureUrl,
}) => {
  const dispatch = useDispatch();

  // ? Animation state (Up & down)
  const [state, setState] = useState(false);

  const handleFollow = (e) => {
    e.preventDefault();
    setState(true);
    dispatch(startFollowing(id));
  };

  return (
    <StyledUserContainer
      className={
        state
          ? `animate__animated animate__backOut${followed ? 'Up' : 'Down'}`
          : 'animate__animated animate__bounceIn'
      }
    >
      <LeftContainer>
        <ProfilePicture
          style={{ backgroundImage: `url(${profilePictureUrl})` }}
        >
          {!profilePictureUrl ? name.substr(0, 2) : ''}
        </ProfilePicture>
      </LeftContainer>
      <RightContainerMod>
        <LeftText>
          {/*  */}
          <H3>
            <Link to={`/user/${id}`}>
              {name}
              <br />
            </Link>
            <span>
              <Link to={`/user/${id}`}>@{name} </Link>
            </span>
          </H3>
          {/* <p>@{name}</p> */}
        </LeftText>
        <OutlinedButtonPrimary
          onClick={handleFollow}
          className={`${followed ? '' : 'fill'}`}
        >
          {followed ? 'Unfollow' : 'Follow'}
        </OutlinedButtonPrimary>
      </RightContainerMod>
    </StyledUserContainer>
  );
};

const StyledUserContainer = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px #d2d2cc solid;
  transition: all 0.2s;

  z-index: 1;
`;

const LeftText = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 2rem;

  > h3 {
    a {
      text-decoration: none;
      color: currentColor;
      margin-right: 0.7rem;

      > span {
        font-weight: 400;
        color: grey;
      }
    }
  }

  > p {
    color: #8ca0aa;
    font-size: 1.5rem;
  }
`;

const RightContainerMod = styled(RightContainer)`
  flex-flow: row nowrap;
  align-items: center;
  margin-right: 1rem;
`;
