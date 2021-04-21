import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../actions/auth';
import imgLogo from '../../assets/twotter-logo.png';
import { OutlinedButtonPrimary } from '../../styles/reusableStyles';
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { clearFeed } from '../../actions/tweets';
import { resetLoading } from '../../actions/ui';

export const TopNavbar = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearFeed());
    dispatch(resetLoading());
    dispatch(logout());
  };

  const handleMyProfile = () => {
    document.querySelector('#LinkToProfile').click();
  };

  return (
    <Navbar>
      <img
        className="animate__animated animate__backInDown"
        src={imgLogo}
        alt="Company logo"
      />
      {uid && (
        <RightContainer>
          <Link
            id="LinkToProfile"
            to={`/user/${uid}`}
            style={{ display: 'none' }}
          ></Link>
          <MyProfileButton
            onClick={handleMyProfile}
            className="animate__animated animate__backInDown"
          >
            <PersonFill /> My profile
          </MyProfileButton>

          <OutlinedButtonPrimaryRed
            onClick={handleLogout}
            className="animate__animated animate__backInDown"
          >
            Logout
          </OutlinedButtonPrimaryRed>
        </RightContainer>
      )}
    </Navbar>
  );
};

const MyProfileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.6rem;
  color: white;
  border: none;
  background-color: #666666;
  border-radius: 5px;
  font-size: 1.5rem;
  margin-right: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
  cursor: pointer;

  > svg {
    margin-right: 0.6rem;
  }

  &:focus {
    outline: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  height: 6rem;
  padding: 1.3rem 1rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 8px;

  > img {
    height: 3.6rem;
  }
`;

const OutlinedButtonPrimaryRed = styled(OutlinedButtonPrimary)`
  border: 1px dashed #d90000;
  color: #d90000;
`;
