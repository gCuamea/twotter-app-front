import styled, { keyframes } from 'styled-components';

// ? LOADING
const load = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }

`;

export const LoaderContainer = styled.div`
  position: relative;
  width: 20rem;
  margin: auto;
`;

export const Loader = styled.div`
  background: #ffffff;
  -webkit-animation: ${load} 1s infinite ease-in-out;
  animation: ${load} 1s infinite ease-in-out;
  width: 1em;
  height: 4em;

  color: #ffffff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;

  &::before {
    background: #ffffff;
    -webkit-animation: ${load} 1s infinite ease-in-out;
    animation: ${load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  &::after {
    background: #ffffff;
    -webkit-animation: ${load} 1s infinite ease-in-out;
    animation: ${load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
    left: 1.5em;
  }
`;

////////////// ?

export const H2 = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: ${(props) => props.theme.primaryColor};
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  > span {
    font-weight: 400;
    color: grey;
  }
`;

export const P = styled.p`
  font-size: 1.5rem;
  color: #3c4460;
`;

export const StyledInputForm = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 0.7rem;
  border: none;
  border-bottom: 1px solid #d5dbe3;
  color: ${(props) => props.theme.primaryColor};

  &::placeholder {
    color: ${(props) => props.theme.primaryColor};
  }
  &:focus {
    outline: none;
  }
`;

export const StyledPrimaryButton = styled.button`
  display: block;
  width: 100%;
  border-radius: 3px;
  color: white;
  padding: 1.2rem 0;
  border: none;
  font-size: 1.4rem;
  margin: 3rem 0;
  cursor: pointer;

  background-color: ${(props) => props.theme.primaryColor};
  transition: all 0.2s ease;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  &:hover {
    transform: translateY(0.3rem);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  &:active,
  &:focus {
    outline: none;
    border: 0;
  }
`;

export const StyledDashboardBox = styled.div`
  padding: 1.8rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100%;
  border-radius: 12px;
  background-color: white;
  /* overflow: hidden; */
  margin-bottom: 4rem;
`;

export const ProfilePicture = styled.div`
  display: flex;
  background-color: #e2e8f0;
  width: 5rem;
  height: 5rem;
  text-transform: uppercase;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  color: #4a5568;
  align-items: center;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-size: cover;
`;

export const LeftContainer = styled.div`
  flex: 0 0 5rem;
  background-color: '#2ad';
`;

export const RightContainer = styled.div`
  display: flex;
  flex: 0 0 calc(100% - 7rem);
  flex-flow: column nowrap;
  justify-content: space-between;
  margin-left: 2rem;
`;

export const OutlinedButtonPrimary = styled.button`
  border: 1px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  background-color: transparent;
  border-radius: 28px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;

  padding: 1rem 0;
  width: 9rem;
  font-weight: bolder;

  transition: all 0.2s ease;

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(0.3rem);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  &.fill {
    color: white;
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

export const TextArea = styled.textarea`
  height: 10rem;
  margin-bottom: 1.4rem;
  border: none;
  border-radius: 5px;
  background-color: #e2e8f0;
  width: 100%;
  padding: 1rem;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const TweetButton = styled.button`
  margin-left: 1.4rem;
  width: 12rem;
  border: none;
  border-radius: 7px;
  color: white;

  font-weight: bolder;
  font-size: 1.5rem;
  background-color: ${(props) => props.theme.primaryColor};
  padding: 1.3rem 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;

  transition: all 0.2s ease;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    border: none;
    transform: translateY(0.3rem);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
`;

export const HeaderTop = styled.div`
  padding: 1.3rem 2rem;
  border-bottom: 1px solid #d7d7d7;
  /* position: relative; */
  z-index: 3;

  > h3 {
    font-size: 1.5rem;
    display: inline-block;
  }
`;

export const StyledTweetsContainer = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px ${(props) => props.theme.primaryColor} dashed;
  flex-flow: row wrap;

  &:last-of-type {
    border-bottom: none;
  }

  transition: all 0.2s;
`;

export const StyledReplyContainer = styled(StyledTweetsContainer)`
  border-bottom: none;
  padding-bottom: 0;
  padding-top: 1rem;

  &:first-of-type {
    padding-top: 0rem;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 2rem;
  word-break: break-all;

  //TEST
  /* width: 30rem; */

  a {
    text-decoration: none;
    color: currentColor;
    margin-right: 0.7rem;

    &:hover {
      border-bottom: 1px solid currentColor;
    }

    > span {
      font-weight: 400;
      color: grey;
    }
  }
`;
