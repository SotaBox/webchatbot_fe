import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GetSitemap from "src/types/sitemap/GetSitemap";

const initialState: Array<GetSitemap> = [];

export const siteMapSlice = createSlice({
  name: "siteMap",
  initialState,
  reducers: {
    getSitemap(state, action: PayloadAction<Array<GetSitemap>>) {
      state.push(...action.payload);
    },
    clearSitemap(state) {
      state.length = 0;
    },
  },
});

const { reducer, actions } = siteMapSlice;
export const siteMapActions = actions;
export default reducer;
