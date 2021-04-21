import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { startUploadingProfilePicture } from '../../actions/auth';

export const UploadPPictureBox = () => {
  // Show button state
  // 0: Both
  // 1: Url
  const [activeButton, setActiveButton] = useState(0);
  const dispatch = useDispatch();

  // ? Handlers
  const handleShowURLForm = () => {
    setActiveButton(1);
  };
  const handleShowUploadForm = () => {
    document.querySelector('#file-upload').click();
  };

  const handleSendUrl = (e) => {
    e.preventDefault();
    let imgUrl = document.querySelector('#imgUrl').value;
    // console.log(imgUrl);

    dispatch(startUploadingProfilePicture(imgUrl, 1));
    document.querySelector('#imgUrl').value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(startUploadingProfilePicture(file, 2));
  };

  return (
    <StyledBox className="animate__animated animate__fadeIn">
      {(activeButton === 0 || activeButton === 1) && (
        <button onClick={handleShowURLForm}>Use URL</button>
      )}
      {activeButton === 0 && (
        <button onClick={handleShowUploadForm}>Upload picture</button>
      )}
      {activeButton === 1 && (
        <StyledForm
          onSubmit={handleSendUrl}
          className="animate__animated animate__fadeIn"
        >
          <textarea placeholder="Place your URL here" type="text" id="imgUrl" />{' '}
          <button type="submit">Submit</button>{' '}
        </StyledForm>
      )}
      <input
        style={{ display: 'none' }}
        type="file"
        name="file"
        id="file-upload"
        onChange={handleFileChange}
      />
    </StyledBox>
  );
};

const StyledForm = styled.form`
  > textarea {
    height: 6rem;
    margin: 1rem 0;
    border: none;
    background-color: #f0f0f0;
    padding: 0.5rem;
    resize: none;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
  }

  > button {
    margin-bottom: 0.7rem;
    padding: 0.3rem 1.6rem;
    border-radius: 15px;
    background-color: transparent;
    color: #349d02;
    border: 2px solid #349d02;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    cursor: pointer;
  }
`;

const StyledBox = styled.div`
  position: absolute;
  z-index: 999;
  top: 4rem;
  right: -1rem;
  width: 20rem;
  background-color: rgba(253, 253, 253, 1);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #d8d8d8;

  display: flex;
  flex-flow: column;
  align-items: center;

  > button {
    display: block;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    color: white;
    font-size: 1.4rem;
    font-weight: bolder;
    border: none;
    background-color: ${(props) => props.theme.primaryColor};

    &:focus {
      outline: none;
    }
  }
`;
