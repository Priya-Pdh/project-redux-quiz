import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { quiz } from "../../reducers/quiz";
import ProgressBar from "../ProgressBar/ProgressBar";

const QuestionContainer = () => {
  const [answer, setAnswer] = useState(null);

  const dispatch = useDispatch();

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const currentQuestion = useSelector(
    (state) => state.quiz.questions[currentQuestionIndex]
  );
  const quizLength = useSelector((state) => state.quiz.questions.length);

  const correctAnswer = currentQuestion.correctAnswerIndex;

  const handleClick = (e) => {
    console.log(correctAnswer, e.target.value);
    if (correctAnswer == e.target.value) {
      console.log("Green");
    } else {
      console.log("Red");
    }
    setAnswer(correctAnswer);
  };

  const handleNext = () => {
    dispatch(quiz.actions.goToNextQuestion());
  };
  return (
    <>
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        quizLength={quizLength}
      />
      <div>
        <h3>{currentQuestion.questionText}</h3>
        <h4>
          {quizLength - currentQuestionIndex}{" "}
          {quizLength - currentQuestionIndex === 1 ? "question" : "questions"}{" "}
          left
        </h4>
        <select size={currentQuestion.options.length} onClick={handleClick}>
          {currentQuestion.options.map((option, index) => (
            <option
              value={index}
              key={index}
              //   disabled={answer !== null && answer !== index}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default QuestionContainer;
