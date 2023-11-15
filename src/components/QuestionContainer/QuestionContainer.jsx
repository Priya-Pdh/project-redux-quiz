import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { quiz } from "../../reducers/quiz";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./QuestionContainer.css"

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

  const handleClick = (selectedAnswerIndex) => {
    setAnswer(selectedAnswerIndex);

    if (selectedAnswerIndex === correctAnswer) {
      console.log("right answer", correctAnswer)
    } else {
      console.log("wrong answer, right answer is", correctAnswer)
    }
  }



  const handleNext = () => {
    dispatch(quiz.actions.goToNextQuestion());
    setAnswer(null);
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

        {currentQuestion.options.map((option, index) => (
          <button
            type="button"
            key={option}
            onClick={() => handleClick(index)}
            value={index}
            className={
              answer === index
                ? index === correctAnswer
                  ? "correct-answer"
                  : "wrong-answer"
                : ""
            }
          >{option}</button>
        )
        )}


      </div >
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default QuestionContainer;
