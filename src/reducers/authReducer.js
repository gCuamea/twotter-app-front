import { types } from '../types/types';

const initialState = {
  checking: true,
  uid: null,
  name: null,
  profilePictureUrl: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authCheckingFinisih:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        ...initialState,
        checking: false,
      };

    case types.authUploadProfilePicture:
      return {
        ...state,
        profilePictureUrl: action.payload,
      };
    default:
      return state;
  }
};
