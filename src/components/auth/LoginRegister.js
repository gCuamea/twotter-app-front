import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import {
  H2,
  StyledInputForm,
  StyledPrimaryButton,
} from '../../styles/reusableStyles';
import { startLogin, startRegister } from '../../actions/auth';

export const LoginRegister = () => {
  const dispatch = useDispatch();

  // ? Login & Register form handling
  const initFormState = {
    lemail: 'alonso3@gmail.com',
    lpassword: '3456aAa',
    rname: '',
    remail: '',
    rpassword: '',
    rpassword2: '',
  };
  const [values, handleFormChange, reset] = useForm(initFormState);
  const { lemail, lpassword, rname, remail, rpassword, rpassword2 } = values;

  const [watchLogin, setWatchLogin] = useState(true);
  const handleShowRegisterLogin = () => {
    reset();
    setWatchLogin(!watchLogin);
  };

  // ? Handlers
  const handleLogin = (e) => {
    e.preventDefault();

    const email = lemail;
    const pw = lpassword;
    reset();

    dispatch(startLogin(email, pw));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (rpassword !== rpassword2) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }
    dispatch(startRegister(rname, remail, rpassword));
  };

  return (
    <FormContainer>
      <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="0.3"
          d="M0,160L34.3,154.7C68.6,149,137,139,206,154.7C274.3,171,343,213,411,240C480,267,549,277,617,256C685.7,235,754,181,823,176C891.4,171,960,213,1029,234.7C1097.1,256,1166,256,1234,240C1302.9,224,1371,192,1406,176L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </StyledSVG>
      <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="0.3"
          d="M0,224L34.3,208C68.6,192,137,160,206,122.7C274.3,85,343,43,411,37.3C480,32,549,64,617,117.3C685.7,171,754,245,823,272C891.4,299,960,277,1029,234.7C1097.1,192,1166,128,1234,117.3C1302.9,107,1371,149,1406,170.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </StyledSVG>
      <H2 className="animate__animated animate__fadeInLeft">
        {watchLogin ? 'Welcome back' : 'Join our community'}
      </H2>

      {watchLogin ? (
        <>
          <StyledFormLogin
            onSubmit={handleLogin}
            className="animate__animated animate__fadeInLeft"
          >
            <StyledP>Email</StyledP>
            <StyledInputForm
              name="lemail"
              value={lemail}
              onChange={handleFormChange}
              type="email"
              placeholder="Your email"
            />
            <StyledP>Password</StyledP>
            <StyledInputForm
              name="lpassword"
              value={lpassword}
              onChange={handleFormChange}
              type="password"
              placeholder="Your password"
            />
            <StyledPrimaryButton>Sign in</StyledPrimaryButton>
          </StyledFormLogin>
          <StyledP2>Or sign in with</StyledP2>
          <StyledSVGGoogle
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </StyledSVGGoogle>
          <GoToRegister
            className="animate__animated animate__fadeInLeft"
            onClick={handleShowRegisterLogin}
          >
            Sign up here &rarr;
          </GoToRegister>
        </>
      ) : (
        <>
          <StyledFormRegister
            onSubmit={handleRegister}
            className="animate__animated animate__fadeInRight"
          >
            <StyledP>Name</StyledP>
            <StyledInputForm
              name="rname"
              value={rname}
              onChange={handleFormChange}
              type="text"
              placeholder="Your name"
            />
            <StyledP>Email</StyledP>
            <StyledInputForm
              name="remail"
              value={remail}
              onChange={handleFormChange}
              type="email"
              placeholder="Your email"
            />
            <StyledP>Password</StyledP>
            <StyledInputForm
              name="rpassword"
              value={rpassword}
              onChange={handleFormChange}
              type="password"
              placeholder="Your password"
            />
            <StyledP>Confirm password</StyledP>
            <StyledInputForm
              name="rpassword2"
              value={rpassword2}
              onChange={handleFormChange}
              type="password"
              placeholder="Your password"
            />
            <StyledPrimaryButton>Sign up</StyledPrimaryButton>
          </StyledFormRegister>
          <GoToLogin
            className="animate__animated animate__fadeInRight"
            onClick={handleShowRegisterLogin}
          >
            Already have an account?
          </GoToLogin>{' '}
        </>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: white;
  width: 33rem;
  height: 57rem;
  margin: auto;
  /* position: relative; */
  transform: translateY(15%);
  top: 45%;
  overflow: hidden;
  padding-top: 13rem;
  /* padding: 13rem 3rem 0; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const StyledForm = styled.form`
  padding: 0 3.5rem;
  font-size: 1.5rem;
`;

const StyledFormLogin = styled(StyledForm)`
  margin-top: 2.4rem;
`;

const StyledFormRegister = styled(StyledForm)`
  margin-top: 1rem;
`;

const StyledSVG = styled.svg`
  position: absolute;
  top: 0;
  width: 60rem;
  > path {
    fill: ${(props) => props.theme.primaryColor};
  }
`;

const GoToRegister = styled.button`
  border: none;
  background-color: transparent;
  border: 2px dashed ${(props) => props.theme.primaryColor};
  color: black;
  padding: 0.7rem 3rem 0.7rem 1rem;
  cursor: pointer;

  position: absolute;
  right: 0;
  bottom: 3rem;
  border-radius: 3px;
  transform: translateX(0.4rem);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const GoToLogin = styled(GoToRegister)`
  bottom: 2rem;
  left: 0;
  transform: translateX(-0.4rem);
`;

const StyledSVGGoogle = styled.svg`
  margin: auto;
  display: block;
  color: ${(props) => props.theme.primaryColor};
  width: 100%;
  height: 3rem;
`;

const StyledP = styled.p`
  color: grey;
  margin-bottom: 1rem;
`;

const StyledP2 = styled.p`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;
