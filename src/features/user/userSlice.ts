import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalScore: 0 };

export const userSlice = createSlice({
  name: "totalScore",
  initialState,
  reducers: {
    plusScore: (state) => {
      state.totalScore += 1;
    },
  },
});

export const { plusScore } = userSlice.actions;

export default userSlice.reducer;
