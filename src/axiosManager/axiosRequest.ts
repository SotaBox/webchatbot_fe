import axios, { AxiosResponse } from "axios";
import QueryString from "qs";
import { UserService } from "src/services";

import { ReduxAuth, store } from "src/store";
type IRequestCb = (token: string) => void;

let isRefreshing = false;
const refreshSubscribers: IRequestCb[] = [];

const subscribeTokenRefresh = (cb: IRequestCb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};
const DEFAULT_CHATBOT_API_URL: string = "";
const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_API_URL || DEFAULT_CHATBOT_API_URL,
  paramsSerializer: {
    serialize: (params) => {
      return QueryString.stringify(params, {
        arrayFormat: "indices",
        allowDots: true,
      });
    },
  },
});

// Add a request interceptor
axiosRequest.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosRequest.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    const { refreshToken } = store.getState().auth;
    if (status === 401) {
      if (!refreshToken) {
        ReduxAuth.logout();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Get Refresh token
          const res = await UserService.refreshToken({ refreshToken });
          console.log("Response from api refresh token:", res);
          const newAccessToken = res.data.access_token;
          console.log("New Accesstoken: ", newAccessToken);
          ReduxAuth.login({
            accessToken: newAccessToken,
            refreshToken: res.data.refresh_token,
          });

          if (originalRequest.headers) {
            originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
            // set new token
            onRefreshed(newAccessToken);

            return axios(originalRequest);
          }
        } catch (error) {
          ReduxAuth.logout();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          // replace the expired token and retry
          if (originalRequest.headers) {
            originalRequest.headers.authorization = `Bearer ${newToken}`;
          }
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosRequest;
