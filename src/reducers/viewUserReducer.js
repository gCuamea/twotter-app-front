import { types } from '../types/types';

const initState = {
  loading: false,
  userInfo: {
    ok: false,
    doIFollow: null,
    user: {},
    tweets: {},
  },
};

export const viewUserReducer = (state = initState, action) => {
  switch (action.type) {
    case types.viewUserInfo:
      return {
        ...state,
        userInfo: { ...action.payload },
      };

    case types.viewUserStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.viewUserFinishedLoading:
      return {
        ...state,
        loading: false,
      };

    case types.viewUserFollow:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          doIFollow: !state.userInfo.doIFollow,
          user: {
            ...state.userInfo.user,
            followers: [...state.userInfo.user.followers, action.payload],
          },
        },
      };

    case types.viewUserUnfollow:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          doIFollow: !state.userInfo.doIFollow,
          user: {
            ...state.userInfo.user,
            followers: state.userInfo.user.followers.filter(
              (foll) => foll._id !== action.payload
            ),
          },
        },
      };

    default:
      return state;
  }
};
