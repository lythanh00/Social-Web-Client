import axios, { AxiosHeaders, AxiosInstance, HeadersDefaults, RawAxiosResponseHeaders } from 'axios';
import { CLIENT_ROUTE_PATH } from '../constant/routes';

const createAxiosInstance = (
  baseURL: string | undefined,
  headers: AxiosHeaders | Partial<HeadersDefaults> | Partial<RawAxiosResponseHeaders>,
) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('token');

    if (token) {
      req.headers.Authorization = 'Bearer ' + token;
    }
    return req;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403) {
        window.location.href = '/' + CLIENT_ROUTE_PATH.NOT_FOUND_ERR;
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = createAxiosInstance(process.env.REACT_APP_API_URL, {
  'Content-Type': 'application/json',
});

export const apiMultiPart = createAxiosInstance(process.env.REACT_APP_API_URL, {
  'Content-Type': 'multipart/form-data',
});
