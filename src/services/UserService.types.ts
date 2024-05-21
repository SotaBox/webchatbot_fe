import { LoginType, UserRole } from "src/constants/auth";

export type GoogleLoginForm = {
  type: LoginType.Google;
  credential: string;
};

export type NormalLoginForm = {
  type: LoginType.Normal;
  username: string;
  password: string;
};

export type ILoginForm = GoogleLoginForm | NormalLoginForm;

export type IResponseLogin = {
  token: string;
  refreshToken: string;
  role: UserRole;
  email?: string;
  id: string;
  username: string;
};

export interface IGetRefreshToken {
  refreshToken: string;
}

export interface IResponseRefreshToken {
  token: string;
  refreshToken: string;
  role: UserRole;
}
