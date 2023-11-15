import { useSelector, useDispatch } from "react-redux";
import { restart } from "../../reducers/quiz";

export const SummaryPage = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  // const score = answers.filter((answer) => answer.isCorrect).length;
  
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
  };
  return (
    <div>
      <p>
        Score: {score}/{answers.length}
      </p>
      {score <= loseScore && <p>You lost! Try again.</p>}
      <button onClick={handleReload}>Restart Quiz</button>
    </div>
  );
};
