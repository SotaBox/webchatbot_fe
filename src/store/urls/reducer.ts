import { createSlice } from "@reduxjs/toolkit";

export interface IUrl {
  id: number;
  url: string;
  content: string;
  vector: string;
}

export const initialState: Array<IUrl> = [
  {
    id: 1,
    url: "https://laodong.vn/",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    vector: "success",
  },
  {
    id: 2,
    url: "https://laodong.vn/",
    content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
    vector: "failed",
  },
  {
    id: 3,
    url: "https://laodong.vn/",
    content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
    vector: "failed",
  },
  {
    id: 4,
    url: "https://laodong.vn/",
    content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
    vector: "success",
  },
  {
    id: 5,
    url: "https://laodong.vn/",
    content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
    vector: "success",
  },
  {
    id: 6,
    url: "https://laodong.vn/",
    content: `Although there are few good resources on the web on how to use server actions with forms, most of them treat forms as server components.`,
    vector: "success",
  },
];

export const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    createUrl() {},
    editUrl() {},
    deleteUrl() {},
  },
});

const { reducer, actions } = urlSlice;
export const urlActions = actions;
export default reducer;
