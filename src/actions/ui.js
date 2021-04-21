import { types } from '../types/types';

export const showModal = (imgUrl) => {
  return (dispatch) => {
    dispatch({
      type: types.uiShowTweetImgModal,
      payload: imgUrl,
    });
  };
};

export const closeModal = () => {
  return (dispatch) => {
    dispatch({
      type: types.uiCloseTweetImgModal,
    });
  };
};

export const finishedLoading = () => ({ type: types.uiFinishedLoading });
export const resetLoading = () => ({ type: types.uiResetLoading });
