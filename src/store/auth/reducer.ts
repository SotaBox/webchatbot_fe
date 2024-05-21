import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthKey, UserRole } from "src/constants/auth";

export interface IReduxAuth {
  accessToken: string;
  refreshToken: string;
  role: UserRole | null;
}
export interface ILoginAuth {
  accessToken: string;
  refreshToken: string;
}

export const authInit: IReduxAuth = {
  accessToken: Cookies.get(AuthKey.AccessToken) || "",
  refreshToken: Cookies.get(AuthKey.RefreshToken) || "",
  role: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    login: (state, action: PayloadAction<ILoginAuth>) => {
      const { accessToken, refreshToken } = action.payload;
      Cookies.set(AuthKey.AccessToken, accessToken, {
        expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000), // expires in 8 hours
      });
      Cookies.set(AuthKey.RefreshToken, refreshToken, {
        expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000), // expires in 8 hours
      });
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.accessToken = "";
      state.role = null;
      Cookies.remove(AuthKey.AccessToken);
      Cookies.remove(AuthKey.RefreshToken);
    },
  },
});

const { reducer, actions } = authReducer;
export const authActions = actions;
export default reducer;
