import Axios from 'axios';
import { BASE_URL, ReadFromLocalstorage } from '../common/utility';

let DeleteRequestBody = undefined;

// Request
Axios.interceptors.request.use(
  function (config) {
    const token = ReadFromLocalstorage('token') || '';

    config.headers.Authorization = `Bearer ${token}`;

    // passing object in delete case request
    if (DeleteRequestBody) {
      config.data = DeleteRequestBody;
      DeleteRequestBody = undefined;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// Response
Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error, 'error');
    console.log(error.response, 'error');

    if (error.response) {
      if (error.response.status === 400) {
        console.log('error- 400');
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        Axios.defaults.headers.common['Authorization'] =
          'bearer ' + (await ReadFromLocalstorage('token')) || '';
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Get Data
export const GetRequest = async (END_POINT) => {
  var response = await Axios.get(BASE_URL + END_POINT);
  console.log(response ,"response")
  return {
    data: response.data,
    message: response.message,
    status: response.status,
    error: response.errors,
  };
};

// Post Data
export const PostRequest = async (END_POINT, DATA) => {
  var response = await Axios.post(BASE_URL + END_POINT, DATA);
  return {
    data: response.data,
    message: response.message,
    status: response.status,
    error: response.errors,
  };
};

// Delete Data
export const DeleteRequest = async (END_POINT, params = {}) => {
  var response = await Axios.delete(BASE_URL + END_POINT, {
    params: params,
  });
  return {
    data: response.data,
    message: response.message,
    status: response.status,
    error: response.errors,
  };
};
