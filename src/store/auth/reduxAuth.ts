import { store } from "../store";
import { ILoginAuth, authActions } from "./reducer";

export const ReduxAuth = {
  login: (data: ILoginAuth) => {
    store.dispatch(authActions.login(data));
  },
  logout: () => {
    store.dispatch(authActions.logout());
  },
 
};
