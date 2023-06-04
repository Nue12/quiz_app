import { useAppDispatch, useAppSelector } from "../app/hook";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QuizAns } from "../utils/QuizAns";
import { plusScore } from "../features/user/userSlice";
import quizs from "../data.json";
import { finishGame, quitGame } from "../features/user/userSlice";
import { QuizDataType } from "../typings/types";

// const defaultRemainTime = {
//   seconds: 30,
//   minutes: 1,
// };

export const QuizCard = () => {
  const [index, setIndex] = useState(0);
  const [countDown, setCountDown] = useState(50);
  // const [remainingTime, setRemainingTime] = useState(defaultRemainTime);
  const [showAnswer, setShowAnswer] = useState(false);
  const [skippedQus, setSkippedQus] = useState<QuizDataType[]>([]);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);

  const timeRef = useRef<null | number>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // next event
  const handleNextClick = useCallback(() => {
    setShowAnswer(false);
    if (index < quizs.length - 1) {
      setIndex((pre) => pre + 1);
    } else {
      setIndex(0);
      if (skippedQus.length > 0) return setHasSkipped(true);
      dispatch(finishGame());
    }
  }, [dispatch, index, skippedQus.length]);

  const handleSkipNextClick = useCallback(() => {
    setShowAnswer(false);
    if (index < skippedQus.length - 1) {
      setIndex((pre) => pre + 1);
    } else {
      setIndex(0);
      dispatch(finishGame());
    }
  }, [dispatch, index, skippedQus.length]);

  const handleSkipClick = () => {
    setSkippedQus((pre) => [...pre, quizs[index]]);
    setIndex((pre) => pre + 1);
  };
  console.log("skipped Qus: ", skippedQus);

  // start timer
  const startTimer = () => {
    timeRef.current = setTimeout(() => {
      if (countDown === 0) {
        timeRef.current && clearTimeout(timeRef.current);
        dispatch(finishGame());
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
  };

  // check user answer and show true or false
  const checkAnswer = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const userAnswer = e.currentTarget.id;
      // check skipped question or not
      const correctAns = hasSkipped
        ? skippedQus[index].correct_answer
        : quizs[index].correct_answer;

      if (userAnswer === correctAns) {
        dispatch(plusScore());
        timeRef.current && clearTimeout(timeRef.current);
        setCountDown((pre) => pre + 3);
      } else {
        timeRef.current && clearTimeout(timeRef.current);
        setCountDown((pre) => pre - 3);
      }
      setShowAnswer(true);
    },
    [dispatch, hasSkipped, index, skippedQus]
  );

  useEffect(startTimer, [countDown, dispatch, handleNextClick]);

  // quit game
  const quitGameHandler = () => {
    dispatch(quitGame());
  };

  const quizAnsList = useMemo(
    () =>
      QuizAns(
        hasSkipped ? skippedQus[index] : quizs[index],
        showAnswer,
        checkAnswer
      ),
    [checkAnswer, hasSkipped, index, showAnswer, skippedQus]
  );

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
      {quizAnsList}
      <button className=" btn" onClick={handleSkipClick}>
        skip
      </button>
      <button
        className=" btn float-right"
        onClick={hasSkipped ? handleSkipNextClick : handleNextClick}
      >
        Next
      </button>
    </div>
  );
};
