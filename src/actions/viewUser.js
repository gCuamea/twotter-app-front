import Swal from 'sweetalert2';
import { axiosConToken } from '../helpers/axiosRequest';
import { types } from '../types/types';

export const startLoadUserInfo = (id) => {
  return async (dispatch) => {
    try {
      dispatch(currentlyLoadingUserInfo());

      const userInfo = await axiosConToken(`tweets/${id}`);
      dispatch(loadInfo(userInfo.data));

      dispatch(finishedLoadingUserInfo());
    } catch (error) {
      console.error(error.response);
      const goBack = () => {
        window.history.back();
      };
      Swal.fire({
        title: 'Error',
        text: error.response.data.msg,
        icon: 'error',
        willClose: goBack,
      });
    }
  };
};

const currentlyLoadingUserInfo = () => ({
  type: types.viewUserStartLoading,
});

const finishedLoadingUserInfo = () => ({
  type: types.viewUserFinishedLoading,
});

export const startFollowUnfollowUser = (id, choice) => {
  // Choice === True => User wants to unfollow
  // Choice === False => User wants to follow

  return async (dispatch, useState) => {
    const { uid, name } = useState().auth;

    try {
      const extraHeader = {
        headerName: 'x-user',
        headerValue: id,
      };
      await axiosConToken('tweets/follow', '', 'PUT', extraHeader);

      if (choice) dispatch(unfollowUser(uid));
      else dispatch(followUser({ _id: uid, name }));
    } catch (error) {
      console.error(error.response);
    }
  };
};

const followUser = (userInfo) => ({
  type: types.viewUserFollow,
  payload: userInfo,
});

const unfollowUser = (id) => ({
  type: types.viewUserUnfollow,
  payload: id,
});

const loadInfo = (infoObj) => ({
  type: types.viewUserInfo,
  payload: infoObj,
});
