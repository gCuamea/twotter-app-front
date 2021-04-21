import { types } from '../types/types';

const initState = {
  follows: {
    mySuggestedFollows: null,
    myFollows: null,
  },
  feed: [],
  currentPage: 1,
  currentlyLoadingMoreTweets: false,
  endOfFeed: false,
};

export const tweetsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.tweetLoadActualFollowers:
      return {
        ...state,
        follows: {
          ...action.payload,
        },
      };

    case types.tweetLoadFeed:
      return {
        ...state,
        feed: [...action.payload],
      };

    case types.tweetGetMore:
      return {
        ...state,
        currentPage: state.currentPage + 1,
        feed: [...action.payload],
      };

    case types.tweetLoadingExtraTweets:
      return {
        ...state,
        currentlyLoadingMoreTweets: true,
      };
    case types.tweetFinishLoadingExtraTweets:
      return {
        ...state,
        currentlyLoadingMoreTweets: false,
      };
    case types.tweetReachedEndOfFeed:
      return {
        ...state,
        endOfFeed: true,
      };
    case types.tweetClearFeed:
      return {
        ...state,
        feed: [],
        currentPage: 1,
        currentlyLoadingMoreTweets: false,
        endOfFeed: false,
      };

    default:
      return state;
  }
};
