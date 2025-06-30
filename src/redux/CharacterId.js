import { createSlice } from "@reduxjs/toolkit";

const characterIdSlice = createSlice({
  name: "characterIdSlice",
  initialState: { characterData: "", webtoonName: "" },
  reducers: {
    selectCharacter(state, action) {
      state.characterData = action.payload;
    },
    selectWebtoon(state, action) {
      state.webtoonName = action.payload;
    },
  },
});

export const characterIdAction = characterIdSlice.actions;

export default characterIdSlice;
