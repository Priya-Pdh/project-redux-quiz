import { useSelector, useDispatch } from "react-redux";
import { restart } from "../../reducers/quiz";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnswersSummary } from "../../components/AnswersSummary/AnswersSummary";
import "./SummaryPage.css";
import pineappleImg from "../../assets/pineapple.png";

import { endQuiz, calculateTimeDifference } from "../../reducers/quiz";

export const SummaryPage = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const navigate = useNavigate();


const totalTime = useSelector((state) => state.quiz.totalTime);

useEffect(() => {
  // Dispatch endQuiz action when the component mounts (summary page is rendered)
  dispatch(endQuiz());
  
  // Dispatch calculateTimeDifference action to update totalTime
  dispatch(calculateTimeDifference());
}, [dispatch]);

  let score = 0;
  //calculate the score, if correct +1 and if incorrect -1
  answers.forEach((answer) => {
    if (answer.isCorrect) {
      score += 1;
    } else {
      score -= 1;
    }
  });

  const handleReload = () => {
    dispatch(restart());
    console.log("restarted");
    navigate("/");
  };
  return (
    <div className="summary-container">
      <p className="score-item">Total Time: {totalTime} </p>
      <p className="score-item">
        Score: {score}/{answers.length}
      </p>
      {score === answers.length && <p className="score-item">You Won! Congratulation 🥳</p>}
      {score >= 1 && score <= 4 && <p className="score-item">Not Bad! Well done 👏</p>}
      {score <= 0 && <p className="score-item">You lost! Try again. </p>}
      <AnswersSummary />
      <button className="reload-button" onClick={handleReload}>Restart Quiz</button>
      <img src={pineappleImg} alt="pineapple" />
    </div>
  );
};
