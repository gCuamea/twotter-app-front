export const types = {
  authCheckingFinisih: '[auth] Finished checking login',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start register',
  authStartTokenRenew: '[auth] Start Token Renew',
  authLogout: '[auth] Logout',
  authUploadProfilePicture: '[auth] Upload profile picture',

  uiShowTweetImgModal: '[ui] Show tweet image modal',
  uiCloseTweetImgModal: '[ui] Close tweet image modal',
  uiResetLoading: '[ui] Restarted loading',
  uiFinishedLoading: '[ui] Finished loading',

  viewUserInfo: '[viewUser] Load requested user information',
  viewUserFollow: '[viewUser] Follow viewing user',
  viewUserUnfollow: '[viewUser] Unfollow viewing user',
  viewUserStartLoading: '[viewUser] Started loading user info',
  viewUserFinishedLoading: '[viewUser] Finished loading user info',

  tweetLoadActualFollowers: '[tweet] Load suggested followers',
  tweetLoadFeed: '[tweet] Load feed',
  tweetLike: '[tweet] Like tweet',
  tweetGetMore: '[tweet] Getting more tweets',
  tweetLoadingExtraTweets: '[tweet] Loading more tweets',
  tweetFinishLoadingExtraTweets: '[tweet] Finished loading more tweets',
  tweetReachedEndOfFeed: '[tweet] Reached end of user feed',
  tweetClearFeed: '[tweet] Clearing feed',
};
