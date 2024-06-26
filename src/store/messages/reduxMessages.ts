import { store } from "../store";
import { messagesActions } from "./reducer";

export const ReduxMessages = {
  createMessageUser: (message: string) => {
    store.dispatch(messagesActions.createMessageUser(message));
  },
  createMessageBot: () => {
    store.dispatch(messagesActions.createMessageBot());
  },
};
