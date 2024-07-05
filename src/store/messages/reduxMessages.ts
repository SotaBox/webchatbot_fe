import { store } from "../store";
import { messagesActions } from "./reducer";

export const ReduxMessages = {
  createMessageUser: (message: string) => {
    store.dispatch(messagesActions.createMessageUser(message));
  },
  createMessageBot: (message: string) => {
    store.dispatch(messagesActions.createMessageBot(message));
  },
};
