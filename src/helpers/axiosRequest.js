import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

export const axiosSinToken = async (endpoint, data, method = 'GET') => {
  const options = {
    url: `${baseUrl}/${endpoint}`,
    method,
    data,
    headers: {
      'Accept-type': 'application/json',
      'Content-type': 'application/json',
    },
  };
  return await axios(options);
};

export const axiosConToken = async (
  endpoint,
  data,
  method = 'GET',
  extraHeaderObj = {},
  extraHeaderObj2 = {}
) => {
  const token = localStorage.getItem('token') || '';
  const options = {
    url: `${baseUrl}/${endpoint}`,
    method,
    data,
    headers: {
      'Accept-type': 'application/json',
      'Content-type': 'application/json',
      'x-token': token,
      [extraHeaderObj.headerName]: extraHeaderObj.headerValue,
      [extraHeaderObj2.headerName]: extraHeaderObj2.headerValue,
    },
  };
  return await axios(options);
};
