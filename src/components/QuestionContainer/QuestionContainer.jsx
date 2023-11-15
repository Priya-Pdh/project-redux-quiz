import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { submitAnswer, goToNextQuestion } from "../../reducers/quiz";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./QuestionContainer.css";

import { SummaryPage } from "../../Page/SummaryPage/SummaryPage";
import { useNavigate } from "react-router-dom";

const QuestionContainer = () => {
  const [answer, setAnswer] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const currentQuestion = useSelector(
    (state) => state.quiz.questions[currentQuestionIndex]
  );
  const quizLength = useSelector((state) => state.quiz.questions.length);

  const quizOver = useSelector((state) => state.quiz.quizOver);

  const correctAnswer = currentQuestion.correctAnswerIndex;

  const handleClick = (selectedAnswerIndex) => {
    setAnswer(selectedAnswerIndex);

    if (selectedAnswerIndex === correctAnswer) {
      console.log("right answer", correctAnswer);
    } else {
      console.log("wrong answer, right answer is", correctAnswer);
    }
  };

  const handleAnswerSubmit = () => {
    if (answer !== null) {
      dispatch(
        submitAnswer({
          questionId: currentQuestion.id,
          answerIndex: answer,
        })
      );
      if (currentQuestionIndex + 1 === quizLength) {
        // If it's the last question, navigate to the summary page
        navigate("/summary");
      } else {
        // If not, go to the next question
        dispatch(quiz.actions.goToNextQuestion());
        setAnswer(null);
      }
    }
  };

  return (
    <>
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        quizLength={quizLength}
      />
      {quizOver ? (
        <SummaryPage />
      ) : (
        <>
          <div>
            <h3>{currentQuestion.questionText}</h3>
            <h4>
              {quizLength - currentQuestionIndex}{" "}
              {quizLength - currentQuestionIndex === 1
                ? "question"
                : "questions"}{" "}
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
              >
                {option}
              </button>
            ))}

            <button onClick={handleAnswerSubmit}>submit</button>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionContainer;
