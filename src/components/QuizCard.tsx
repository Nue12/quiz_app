import { useAppDispatch, useAppSelector } from "../app/hook";
import { useCallback, useEffect, useRef, useState } from "react";
import { QuizAns } from "../utils/QuizAns";
import { plusScore } from "../features/user/userSlice";
import quizs from "../data.json";
import { finishGame, quitGame } from "../features/user/userSlice";

export const QuizCard = () => {
  const [index, setIndex] = useState(0);
  const [countDown, setCountDown] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);

  const timeRef = useRef<null | number>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // next event
  const handleNextClick = useCallback(() => {
    timeRef.current && clearTimeout(timeRef.current);
    if (index < quizs.length - 1) {
      setCountDown(5);
      setIndex((pre) => pre + 1);
      setShowAnswer(false);
    } else {
      setIndex(0);
      dispatch(finishGame());
    }
  }, [dispatch, index]);

  // start timer
  const startTimer = () => {
    timeRef.current = setTimeout(() => {
      if (countDown === 0) {
        timeRef.current && clearTimeout(timeRef.current);
        handleNextClick();
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
  };

  // check user answer and show true or false
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    timeRef.current && clearTimeout(timeRef.current);
    const userAnswer = e.currentTarget.id;
    const correctAns = quizs[index].correct_answer;
    if (userAnswer === correctAns) dispatch(plusScore());
    setShowAnswer(true);
  };

  useEffect(startTimer, [countDown, handleNextClick]);

  // quit game
  const quitGameHandler = () => {
    dispatch(quitGame());
  };

  return (
    <div className=" card sm:h-[21rem] h-[100vh]">
      {/* time & scores & quit btn */}
      <div className="flex justify-between my-4 items-center">
        <div>Time left: {countDown}</div>
        <div>score: {user.totalScore}</div>
        <button onClick={quitGameHandler} className="quit_btn">
          Quit
        </button>
      </div>
      {/* question */}
      <div className=" font-bold text-lg text-[#212f46] text-center">
        {quizs[index].question}
      </div>
      {/* answers */}
      <div className=" flex flex-wrap items-center justify-center my-4 sm:justify-between">
        <QuizAns
          quiz={quizs[index]}
          showAnswer={showAnswer}
          checkAnswer={checkAnswer}
        />
      </div>
      {/* next btn */}
      <button className=" btn float-right" onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};
