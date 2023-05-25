import { useAppDispatch, useAppSelector } from "../app/hook";
import scoreImg from "../assets/pngegg (1).png";
import downloadIcon from "../assets/download.svg";
import { quitGame, startGame } from "../features/user/userSlice";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

export const ScoreBoard = () => {
  const domEl = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // download html as image
  const downloadImage = async () => {
    if (domEl.current) {
      const dataUrl = await htmlToImage.toPng(domEl.current);
      // download image
      const link = document.createElement("a");
      link.download = "html-to-img.png";
      link.href = dataUrl;
      link.click();
    }
  };

  // game restart
  const restartGameHandler = () => {
    dispatch(startGame());
  };

  // game quit
  const quitGameHandler = () => {
    dispatch(quitGame());
  };

  return (
    <div className="relative">
      <div
        ref={domEl}
        className=" container bg-white flex flex-col justify-between w-[20rem] h-[20rem]  rounded-xl shadow-sm shadow-black m-auto p-6 "
      >
        <div className="text-center ">
          <h1>Quiz Complete! </h1>
          <img src={scoreImg} alt="scoreImg" className=" w-20 m-auto" />
          <p>Your score: {user.totalScore}</p>
        </div>
      </div>
      <div className=" flex justify-between absolute bottom-0 w-full left-0 p-5">
        <button
          onClick={downloadImage}
          className="p-1 rounded-full hover:bg-gray-200 transition-all duration-150"
        >
          <img
            src={downloadIcon}
            alt="downloadIcon"
            className=" w-7 cursor-pointer"
          />
        </button>
        <div>
          <button onClick={quitGameHandler}>Quit</button>
          <button className="btn" onClick={restartGameHandler}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};
