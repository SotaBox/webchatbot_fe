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
    return axios.post<IResponse<IResponseRefreshToken>>(
      "/auth/refresh-token",
      data,
      { ...config, baseURL: import.meta.env.VITE_API_URL }
    );
  },
};
