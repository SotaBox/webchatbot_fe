import { Action, combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/reducer";
import urls from "./urls/reducer";
import messages from "./messages/reducer";

// Change version when update initialState in Reducer
const VERSION_STORE = 9;

const PERSIST_CONFIG = {
  storage,
  version: VERSION_STORE,
  migrate: createMigrate({
    [VERSION_STORE]: () => {
      return undefined; // clear out device state
    },
  }),
};

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      blacklist: ["accessToken", "refreshToken", "role"],
      ...PERSIST_CONFIG,
    },
    auth
  ),
  url: urls,
  message: messages,
});

export const store = createStore(rootReducer, composeWithDevTools());
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
