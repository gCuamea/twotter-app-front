import { axiosConToken, axiosSinToken } from '../helpers/axiosRequest';
import { fileUpload } from '../helpers/fileUpload';
import { types } from '../types/types';
import { startLoadingFeed, startLoadingFollowers } from './tweets';
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      // ? Respuesta del API a la hora de hacer login
      const { data: resp } = await axiosSinToken(
        'auth',
        { email, password },
        'POST'
      );

      // ? Guard Clause
      if (!resp.ok) return;

      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      // ? Cargar informacion pertinente del usuario
      dispatch(startLoadingFeed());
      dispatch(startLoadingFollowers());
      dispatch(
        login({
          uid: resp.uid,
          name: resp.name,
          profilePictureUrl: resp.profilePictureUrl,
        })
      );
    } catch (error) {
      Swal.fire('Error', error.response.data.msg, 'error');
      console.error(error.response);
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      // ? Enviar informacion al API para registrar
      const { data: resp } = await axiosSinToken(
        'auth/new',
        { name, email, password },
        'POST'
      );

      // ? Guard Clause
      if (!resp.ok) return;

      // ? SET JWT
      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      Swal.fire('Registration complete', 'Welcome to Twotter!', 'success');
      dispatch(startLogin(email, password));
    } catch (error) {
      Swal.fire('Error', error.response.data.msg, 'error');
      console.error(error.response);
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      // ? Revalidacion JWT
      const { data: resp } = await axiosConToken('auth/renew');

      // ? Guard Clause
      if (!resp.ok) return;

      // ? Revalidacion hecha con exito
      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(
        login({
          name: resp.name,
          uid: resp.uid,
          profilePictureUrl: resp.profilePictureUrl,
        })
      );
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

export const startUploadingProfilePicture = (action, typeOfAction) => {
  // ? Type of action
  // 1. Use user URL
  // 2. Upload image from browser
  return async (dispatch) => {
    let urlToUpload;
    try {
      if (typeOfAction === 1) urlToUpload = action;

      if (typeOfAction === 2) {
        urlToUpload = await fileUpload(action);
      }

      // ? API Call
      await axiosConToken(
        'auth/ProfilePicture',
        { pictureUrl: urlToUpload },
        'PUT'
      );
      Swal.fire('Profile picture updated succesfully', '', 'success');
      dispatch(UploadProfilePicture(urlToUpload));
      dispatch(startLoadingFeed());
    } catch (error) {
      Swal.fire(
        'Picture upload error.',
        error.response.data.errors.pictureUrl.msg,
        'error'
      );
    }
  };
};

// ? Redux update
export const UploadProfilePicture = (url) => ({
  type: types.authUploadProfilePicture,
  payload: url,
});

// ? Redux update
export const checkingFinish = () => ({
  type: types.authCheckingFinisih,
});

// ? Redux update
export const logout = () => {
  localStorage.clear();

  return {
    type: types.authLogout,
  };
};

// ? Redux update
const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
