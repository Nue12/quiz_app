import { IntroPage } from "./components/IntroPage";
import { useAppSelector } from "./app/hook";
import { QuizCard } from "./components/QuizCard";
import { ScoreBoard } from "./components/ScoreBoard";

function App() {
  const gameStatus = useAppSelector((state) => state.user.gameStatus);

  switch (gameStatus) {
    case "idle":
      return <IntroPage />;
      break;
    case "playing":
      return <QuizCard />;
      break;
    case "finish":
      return <ScoreBoard />;
      break;
    default:
      return <h1>Something went wrong!</h1>;
      break;
  }
}

export default App;
