import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Message from "src/types/chatbot/Message";
import { UserRole } from "src/types/chatbot/UserRole";

//   {
//     id: "1",
//     content: "How are you",
//     role: UserRole.USER,
//     createdAt: Date().toString(),
//   },
//   {
//     id: "2",
//     content: `I am ChatGPT, an artificial intelligence language model
//                     developed by OpenAI. I am based on the GPT-4 architecture,
//                     designed to understand and generate human-like text. My
//                     purpose is to assist with a wide range of tasks, including
//                     answering questions, providing information, generating
//                     creative content, and more. How can I assist you today?`,
//     role: UserRole.BOT,
//     createdAt: Date().toString(),
//   },
//   {
//     id: "3",
//     content: "How old are you",
//     role: UserRole.USER,
//     createdAt: Date().toString(),
//   },
//   {
//     id: "4",
//     content: `
// ChatGPT
// I don't have an age like humans do because I'm an artificial intelligence created by OpenAI. I was developed as part of the GPT-4 architecture, which was released in March 2023.`,
//     role: UserRole.BOT,
//     createdAt: Date().toString(),
//   },
// ];
const initialState: Array<Message> = [];

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createMessageUser(state, action: PayloadAction<string>) {
      const newMessageUser: Message = {
        role: UserRole.USER,
        content: action.payload,
      };
      state.push(newMessageUser);
    },
    createMessageBot(state, action: PayloadAction<string>) {
      const newMessageBot: Message = {
        role: UserRole.BOT,
        content: action.payload,
      };
      state.push(newMessageBot);
    },
  },
});

const { reducer, actions } = messagesSlice;
export const messagesActions = actions;
export default reducer;
