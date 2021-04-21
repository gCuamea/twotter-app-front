import { axiosConToken } from '../helpers/axiosRequest';
import { fileUpload } from '../helpers/fileUpload';
import { types } from '../types/types';
import _ from 'lodash';
import { finishedLoading } from './ui';

export const startLoadingFollowers = () => {
  return async (dispatch) => {
    try {
      const { data: resp } = await axiosConToken('tweets/whoToFollow');
      if (!resp.ok) return;

      const { myFollows, mySuggestedFollows } = resp;
      dispatch(loadFollowers({ myFollows, mySuggestedFollows }));
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const submitTweet = (body, file) => {
  return async (dispatch) => {
    try {
      const tweetData = { body };

      if (file) {
        const imgUrl = await fileUpload(file);
        tweetData.imgUrl = imgUrl;
      }

      await axiosConToken('tweets', tweetData, 'POST');
      dispatch(startLoadingFeed());
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const loadFollowers = (followersObj) => {
  return {
    type: types.tweetLoadActualFollowers,
    payload: followersObj,
  };
};

export const startLoadingFeed = () => {
  return async (dispatch) => {
    try {
      const { data: resp } = await axiosConToken('tweets/getUserFeed');
      if (!resp.ok) throw new Error('Error al cargar los tweets.');

      dispatch(loadFeed(resp.feed));
      dispatch(finishedLoading());
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const loadFeed = (tweetsArr) => ({
  type: types.tweetLoadFeed,
  payload: tweetsArr,
});

export const startLikeTweet = (tweetId) => {
  return async (dispatch) => {
    try {
      const extraHeader = {
        headerName: 'x-tweetid',
        headerValue: tweetId,
      };
      await axiosConToken('tweets/like', '', 'PUT', extraHeader);
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const startRtTweet = (tweetId) => {
  return async (dispatch) => {
    try {
      const extraHeader = {
        headerName: 'x-tweetid',
        headerValue: tweetId,
      };
      await axiosConToken('tweets/retweet', '', 'PUT', extraHeader);
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const startFollowing = (uid) => {
  return async (dispatch) => {
    try {
      dispatch(loadingMoreTweets());
      const extraHeader = {
        headerName: 'x-user',
        headerValue: uid,
      };
      await axiosConToken('tweets/follow', '', 'PUT', extraHeader);
      dispatch(startLoadingFollowers());
      dispatch(clearFeed());
      dispatch(startLoadingFeed());
      dispatch(finishLoadingMoreTweets());
    } catch (error) {
      dispatch(finishLoadingMoreTweets());
      console.error(error.response);
    }
  };
};

export const clearFeed = () => ({
  type: types.tweetClearFeed,
});

export const startReplyTweet = (twId, replyBody) => {
  return async (dispatch) => {
    try {
      const extraHeader = {
        headerName: 'x-tweetid',
        headerValue: twId,
      };
      const extraHeader2 = {
        headerName: 'x-commentbody',
        headerValue: replyBody,
      };
      await axiosConToken(
        'tweets/comment',
        '',
        'PUT',
        extraHeader,
        extraHeader2
      );
      dispatch(startLoadingFeed());
    } catch (error) {
      console.error(error.response);
    }
  };
};

export const startGettingMoreTweets = () => {
  return async (dispatch, useState) => {
    try {
      const {
        currentPage,
        endOfFeed,
        feed,
        currentlyLoadingMoreTweets,
      } = useState().tweets;

      /* debugger; */
      // ? Guard Clause (No hay mas tweets por conseguir)

      if (endOfFeed || currentlyLoadingMoreTweets) return;

      dispatch(loadingMoreTweets());
      const resp = await axiosConToken('tweets/getUserFeed', {}, 'GET', {
        headerName: 'x-currentPage',
        headerValue: currentPage + 1,
      });

      let { feed: newTweets } = resp.data;

      if (!newTweets.length) {
        dispatch(reachedEndOfFeed());
        dispatch(finishLoadingMoreTweets());
        return;
      }

      const isSameTweet = (a, b) => {
        if (a.id === b.id) return true;
        return false;
      };
      newTweets = _.uniqWith([...feed, ...newTweets], isSameTweet);

      dispatch(getMoreTweets(newTweets));
      dispatch(finishLoadingMoreTweets());
    } catch (error) {
      console.error(error);
    }
  };
};

const getMoreTweets = (newTweets) => ({
  type: types.tweetGetMore,
  payload: newTweets,
});

const loadingMoreTweets = () => ({
  type: types.tweetLoadingExtraTweets,
});
const finishLoadingMoreTweets = () => ({
  type: types.tweetFinishLoadingExtraTweets,
});
const reachedEndOfFeed = () => ({
  type: types.tweetReachedEndOfFeed,
});
