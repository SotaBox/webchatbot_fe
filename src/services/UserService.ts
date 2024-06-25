import axios, { AxiosRequestConfig } from "axios";
import axiosRequest from "../axiosManager/axiosRequest";
import {
  IGetRefreshToken,
  ILoginForm,
  IResponseLogin,
  IResponseRefreshToken,
} from "./UserService.types";
import { IResponse } from "./types";

export const UserService = {
  login: (data: ILoginForm, config?: AxiosRequestConfig) => {
    return axiosRequest.post<IResponse<IResponseLogin>>(
      "/auth/login",
      data,
      config
    );
  },

  refreshToken: (data: IGetRefreshToken, config?: AxiosRequestConfig) => {
    // config = {
    //   ...config,
    //   headers: {
    //     ...config?.headers,
    //     Authorization: `Bearer ${data.refreshToken}`,
    //   },
    //   baseURL: "http://125.212.201.24:5000",
    // };

    return axiosRequest.post("/auth/refresh_token", data, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${data.refreshToken}`,
      },
    });
  },
};
