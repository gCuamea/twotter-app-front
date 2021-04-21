import React from 'react';
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';
import styled from 'styled-components';
import logo from '../../assets/twotter-logo-white.png';

export const Footer = () => {
  return (
    <Container>
      <LogoImg /* src={logo} alt="Company logo" */></LogoImg>
      <SocialsContainer>
        <SocialCircle>
          <Facebook />
        </SocialCircle>
        <SocialCircle>
          <Twitter />
        </SocialCircle>
        <SocialCircle>
          <Instagram />
        </SocialCircle>
      </SocialsContainer>
      <CompanyLinks>
        <LinkC>
          <a href="/#">Info</a>
        </LinkC>
        <LinkC>
          <a href="/#">Support</a>
        </LinkC>
        <LinkC>
          <a href="/#">Marketing</a>
        </LinkC>
        <LinkC>
          <a href="/#">Terms of use</a>
        </LinkC>
        <LinkC>
          <a href="/#">Privacy Policy</a>
        </LinkC>
      </CompanyLinks>
      <BottomText>&copy; 2021 Alonso Cuamea.</BottomText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 30rem;
  background-color: #051120;
  color: white;
  font-size: 3rem;
  border-radius: 7px;
  padding: 2rem 0;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
`;

const SocialsContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const SocialCircle = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: #051120;
  }
`;

const CompanyLinks = styled.ul`
  width: 70%;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const LinkC = styled.li`
  font-size: 1.3rem;
  margin-right: 1rem;

  > a {
    color: white;
    text-decoration: none;
  }
`;

const LogoImg = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  width: 60%;
  height: 0;
  padding-top: 20.64%;
`;

const BottomText = styled.p`
  color: #aeaeae;
  font-size: 1.2rem;
`;
