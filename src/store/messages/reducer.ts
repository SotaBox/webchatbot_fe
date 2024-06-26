import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Message from "src/types/chatbot/Message";
import { UserRole } from "src/types/chatbot/UserRole";

const initialState: Array<Message> = [
  {
    id: "1",
    content: "How are you",
    role: UserRole.USER,
    createdAt: Date().toString(),
  },
  {
    id: "2",
    content: `I am ChatGPT, an artificial intelligence language model
                    developed by OpenAI. I am based on the GPT-4 architecture,
                    designed to understand and generate human-like text. My
                    purpose is to assist with a wide range of tasks, including
                    answering questions, providing information, generating
                    creative content, and more. How can I assist you today?`,
    role: UserRole.BOT,
    createdAt: Date().toString(),
  },
  {
    id: "3",
    content: "How old are you",
    role: UserRole.USER,
    createdAt: Date().toString(),
  },
  {
    id: "4",
    content: `
ChatGPT
I don't have an age like humans do because I'm an artificial intelligence created by OpenAI. I was developed as part of the GPT-4 architecture, which was released in March 2023.`,
    role: UserRole.BOT,
    createdAt: Date().toString(),
  },
];
const generateMessage = () => {
  const words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  const text = [];
  let x = 7;
  while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
  return text.join(" ");
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createMessageUser(state, action: PayloadAction<string>) {
      const newMessageUser: Message = {
        id: Math.random().toString(),
        role: UserRole.USER,
        createdAt: Date().toString(),
        content: action.payload,
      };
      state.push(newMessageUser);
    },
    createMessageBot(state) {
      const newMessageBot: Message = {
        id: Math.random().toString(),
        role: UserRole.BOT,
        createdAt: Date().toString(),
        content: generateMessage(),
      };
      state.push(newMessageBot);
    },
  },
});

const { reducer, actions } = messagesSlice;
export const messagesActions = actions;
export default reducer;
