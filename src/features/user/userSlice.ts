import { createSlice } from "@reduxjs/toolkit";

export interface User {
  totalScore: number;
  gameStatus: "idle" | "playing" | "finish";
}

const initialState: User = { totalScore: 0, gameStatus: "idle" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    plusScore: (state) => {
      state.totalScore += 1;
    },
    startGame: (state) => {
      return { ...state, gameStatus: "playing" };
    },
    finishGame: (state) => {
      return { ...state, gameStatus: "finish" };
    },
    quitGame: (state) => {
      return { ...state, gameStatus: "idle" };
    },
  },
});

export const { plusScore, startGame, finishGame, quitGame } = userSlice.actions;

export default userSlice.reducer;
