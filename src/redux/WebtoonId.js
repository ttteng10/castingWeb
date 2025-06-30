import { createSlice } from "@reduxjs/toolkit";

const webtoonIdSlice = createSlice({
  name: "webtoonIdSlice",
  initialState: { webtoon: {} },
  reducers: {
    clickWebtoonId(state, action) {
      state.webtoon = action.payload;
    },
  },
});

export const webtoonIdAction = webtoonIdSlice.actions;

export default webtoonIdSlice;
