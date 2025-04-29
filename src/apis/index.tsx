import axios, { AxiosHeaders, AxiosInstance, HeadersDefaults, RawAxiosResponseHeaders } from 'axios';
import { CLIENT_ROUTE_PATH } from '../constant/routes';
import { navigateTo } from '../utils/navigate';

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
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refreshToken');

      // Kiểm tra nếu lỗi là 401 và chưa thực hiện refresh token
      if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu rằng đã thử refresh token

        try {
          // Yêu cầu token mới
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          // Lưu token mới
          localStorage.setItem('token', data.access_token);

          // Cập nhật token và gửi lại yêu cầu ban đầu
          originalRequest.headers.Authorization = 'Bearer ' + data.access_token;
          return instance(originalRequest);
        } catch (err) {
          // Nếu refresh token không hợp lệ thì chuyển hướng đến trang login
          navigateTo('/' + CLIENT_ROUTE_PATH.SIGNIN);
          return Promise.reject(err);
        }
      } else if (error.response.status === 403) {
        navigateTo('/' + CLIENT_ROUTE_PATH.SIGNIN);
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
