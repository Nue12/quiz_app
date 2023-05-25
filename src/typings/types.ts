export interface ChoiceType {
  id: string;
  value: string;
}

export interface QuizDataType {
  id: string;
  question: string;
  choices: ChoiceType[];
  correct_answer: string;
}
