import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

export interface AnswerData {
  id: string;
  value: string;
}

export interface QuizData {
  id: string;
  question: string;
  choices: AnswerData[];
  correct_answer: string;
}

const initialState: QuizData[] = data;

export const quizSlice = createSlice({
  name: "quizs",
  initialState,
  reducers: {},
});

export default quizSlice.reducer;
