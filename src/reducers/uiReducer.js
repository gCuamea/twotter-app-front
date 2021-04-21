import { types } from '../types/types';

const initState = {
  modal: {
    showModal: false,
    modalImgUrl: null,
  },
  appIsLoading: true,
};

export const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case types.uiShowTweetImgModal:
      return {
        ...state,
        modal: {
          showModal: true,
          modalImgUrl: action.payload,
        },
      };

    case types.uiCloseTweetImgModal:
      return { ...initState, appIsLoading: false };

    case types.uiFinishedLoading:
      return {
        ...state,
        appIsLoading: false,
      };

    case types.uiResetLoading:
      return {
        ...state,
        appIsLoading: true,
      };

    default:
      return state;
  }
};
