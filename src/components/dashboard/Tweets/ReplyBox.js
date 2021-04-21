import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { startReplyTweet } from '../../../actions/tweets';
import { useForm } from '../../../hooks/useForm';
import {
  LeftContainer,
  ProfilePicture,
  RightContainer,
  StyledReplyContainer,
  TextArea,
  TweetButton,
} from '../../../styles/reusableStyles';

export const ReplyBox = ({ myName, twId }) => {
  const dispatch = useDispatch();
  const { profilePictureUrl } = useSelector((state) => state.auth);

  // ? Form control
  const formInit = {
    body: '',
  };
  const [values, handleUseForm, reset] = useForm(formInit);
  const { body } = values;

  const remainingLetters = 140 - body.length;

  const handleReply = (e) => {
    e.preventDefault();
    if (body.length > 0 && body.length <= 140) {
      dispatch(startReplyTweet(twId, body));
      reset();
    }
  };

  return (
    <StyledReplyContainer>
      <LeftContainer>
        <ProfilePicture
          style={{ backgroundImage: `url(${profilePictureUrl})` }}
        >
          {!profilePictureUrl ? myName.substr(0, 2) : ''}
        </ProfilePicture>
      </LeftContainer>
      <RightContainer>
        <ReplyForm onSubmit={handleReply}>
          <ReplyTextArea
            minLength="1"
            maxLength="140"
            required
            name="body"
            value={body}
            onChange={handleUseForm}
            placeholder="Twoot your reply"
          ></ReplyTextArea>
          <BotRightContainer>
            <p>{remainingLetters}</p>
            <TweetButton>Reply</TweetButton>
          </BotRightContainer>
        </ReplyForm>
      </RightContainer>
    </StyledReplyContainer>
  );
};

const ReplyForm = styled.form`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: center;
`;

const ReplyTextArea = styled(TextArea)`
  height: 7rem;
  resize: none;
`;

const BotRightContainer = styled.div`
  display: flex;
  align-items: center;
`;
