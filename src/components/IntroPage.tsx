import { useAppDispatch } from "../app/hook";
import { startGame } from "../features/user/userSlice";
import quizImg from "../assets/quiz.svg";

export const IntroPage = () => {
  const dispatch = useAppDispatch();

  const startGameHandler = () => {
    dispatch(startGame());
  };

  return (
    <div className="card text-center">
      <img src={quizImg} alt="quizImg" className="w-24 mx-auto" />
      <h1>Take the Quiz</h1>
      <button className="btn" onClick={startGameHandler}>
        Start
      </button>
    </div>
  );
};
