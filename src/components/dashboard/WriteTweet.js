import React, { useState } from 'react';
import styled from 'styled-components';
import {
  StyledDashboardBox,
  ProfilePicture,
  LeftContainer,
  TweetButton,
  TextArea,
} from '../../styles/reusableStyles';
import { Image, XCircleFill } from 'react-bootstrap-icons';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { submitTweet } from '../../actions/tweets';
import { fileUpload } from '../../helpers/fileUpload';

export const WriteTweet = () => {
  const dispatch = useDispatch();

  // ? Form control
  const formInit = {
    body: '',
  };
  const [values, handleUseForm, reset] = useForm(formInit);
  const { body } = values;
  const remainingLetters = 140 - body.length;

  const [file, setFile] = useState(null);
  const { name, profilePictureUrl } = useSelector((state) => state.auth);

  // ? Handlers
  const handleSubmitTweet = (e) => {
    e.preventDefault();
    dispatch(submitTweet(body, file));
    setFile(null);
    reset();
  };

  const handlePictureUpload = (e) => {
    document.querySelector('#fileSelector').click();
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeImage = () => {
    setFile(null);
    fileUpload(file);
  };

  return (
    <StyledWriteTweet>
      <LeftContainer>
        <ProfilePicture
          style={{ backgroundImage: `url(${profilePictureUrl})` }}
        >
          {!profilePictureUrl ? name.substr(0, 2) : ''}
        </ProfilePicture>
      </LeftContainer>
      <RightContainerForm onSubmit={handleSubmitTweet}>
        <TextArea
          minLength="1"
          maxLength="140"
          required
          name="body"
          onChange={handleUseForm}
          value={body}
          placeholder="What's happening..."
        ></TextArea>
        <BottomContainer>
          <UploadImageContainer>
            <Image
              onClick={handlePictureUpload}
              color={file ? 'green' : 'gray'}
              size={23}
            />
            {file && (
              <XCircleFill onClick={removeImage} size={18} color="#f9575b" />
            )}

            <input
              id="fileSelector"
              type="file"
              name="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </UploadImageContainer>
          <BottomRightContainer>
            <p>{remainingLetters}</p>
            <TweetButton>Tweet</TweetButton>
          </BottomRightContainer>
        </BottomContainer>
      </RightContainerForm>
    </StyledWriteTweet>
  );
};

const StyledWriteTweet = styled(StyledDashboardBox)`
  display: flex;
`;

const RightContainerForm = styled.form`
  display: flex;
  flex: 0 0 calc(100% - 7rem);
  flex-flow: column nowrap;
  justify-content: space-between;
  margin-left: 2rem;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BottomRightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UploadImageContainer = styled.div`
  align-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5rem;
`;
