import { useSelector, useDispatch } from "react-redux";
import { restart } from "../../reducers/quiz";
import { useNavigate } from "react-router-dom";

export const SummaryPage = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const navigate = useNavigate();

  let score = 0;
  const loseScore = -1;
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
    <div>
      <p>
        Score: {score}/{answers.length}
      </p>  
      {score === answers.length && <p>You Won! Congratulation 🥳</p>}
      {score >= 1 && score <= 4 && <p>Not Bad! Well done 👏</p>}
      {score <= 0 && loseScore && <p>You lost! Try again. </p>}
      <button onClick={handleReload}>Restart Quiz</button>
    </div>
  );
};
