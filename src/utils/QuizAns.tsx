import { QuizDataType } from "../typings/types";

interface Props {
  quiz: QuizDataType;
  showAnswer: boolean;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const QuizAns = ({ quiz, showAnswer, checkAnswer }: Props) => {
  return (
    <>
      {quiz.choices.map((ans) => {
        const specialClassName = showAnswer
          ? ans.id === quiz.correct_answer
            ? "text-green-500"
            : "text-red-600"
          : "";
        return (
          <button
            key={ans.id}
            className={` btn_chose text-[#222] border border-[#222] rounded w-[20rem] my-2 px-3 py-2 ${specialClassName} cursor-pointer ${
              showAnswer ? "" : "hover:bg-[#222] hover:text-[#fff]"
            } transition-all duration-200 `}
            id={ans.id}
            onClick={checkAnswer}
            disabled={showAnswer}
          >
            {ans.value}
          </button>
        );
      })}
    </>
  );
};
