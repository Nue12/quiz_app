import { useAppDispatch, useAppSelector } from "../app/hook";
import { useState } from "react";
import { QuizAns } from "../utils/QuizAns";
import { plusScore } from "../features/user/userSlice";
export const QuizCard = () => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const quizs = useAppSelector((state) => state.quiz);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleNextClick = () => {
    if (index < quizs.length - 1) {
      setIndex((pre) => pre + 1);
      setShowAnswer(false);
    } else {
      setIndex(0);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const userAnswer = e.currentTarget.id;
    const correctAns = quizs[index].correct_answer;
    if (userAnswer === correctAns) {
      console.log("answer true");
      dispatch(plusScore());
    } else {
      console.log("false answer");
    }
    setShowAnswer(true);
  };

  return (
    <div className=" w-[45rem] h-[20rem] p-4 rounded-xl shadow-sm shadow-black m-auto container">
      {/* time */}
      <div>0:31</div>
      <div>score: {user.totalScore}</div>
      <div>
        {/* question */}
        <div className=" font-bold text-lg text-[#001e4d] text-center">
          {quizs[index].question}
        </div>
        {/* answers */}
        <div className=" flex flex-wrap justify-around my-4">
          <QuizAns
            quiz={quizs[index]}
            showAnswer={showAnswer}
            checkAnswer={checkAnswer}
          />
        </div>
      </div>
      <button className=" text-white btn" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};
