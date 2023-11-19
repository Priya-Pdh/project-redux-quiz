import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { startQuiz, quiz, submitAnswer } from "../../reducers/quiz";

import ProgressBar from "../ProgressBar/ProgressBar";
import tacoImg from "../../assets/taco.png";

import "./QuestionContainer.css";

import { SummaryPage } from "../../Page/SummaryPage/SummaryPage";
import { useNavigate } from "react-router-dom";

const QuestionContainer = () => {
  const [answer, setAnswer] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [correctAnswerClass, setCorrectAnswerClass] = useState("");
  const [timeOver, setTimeOver] = useState("");

  const [counter, setCounter] = useState(10);

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

  //staring the quiz timer when the first questions mounts using useEffect
  const timeState = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(startQuiz());
  }, [dispatch, timeState.currentQuestionIndex, timeState.quizStartTime]);

  const handleClick = (selectedAnswerIndex) => {
    if (!answerSelected) {
      setAnswer(selectedAnswerIndex);
      setAnswerSelected(true);
      setCorrectAnswerClass(
        selectedAnswerIndex === correctAnswer ? "corrected-answer" : ""
      );
    }

    if (selectedAnswerIndex === correctAnswer) {
      console.log("right answer", correctAnswer);
    } else {
      console.log("wrong answer, right answer is", correctAnswer);
    }
  };

  useEffect(() => {
    setCorrectAnswerClass(
      answerSelected && answer !== correctAnswer ? "corrected-answer" : ""
    );
  }, [answerSelected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    // If the timer is 0 and no answer is selected, disable buttons and go to the next question
    if (counter === 0 && !answerSelected) {
      setTimeOver("Time over! Sorry, you get no point for this question.");
      setAnswerSelected(true);
      setAnswer(null);
    }

    // If user selects an answer, than the timer should stop at the second the user selects an answer.
    if (answerSelected) {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const handleAnswerSubmit = () => {
    if (answer !== null) {
      dispatch(
        submitAnswer({
          questionId: currentQuestion.id,
          answerIndex: answer,
        })
      );
    }

    if (answerSelected) {
      if (currentQuestionIndex + 1 === quizLength) {
        // If it's the last question, navigate to the summary page
        navigate("/summary");
      } else {
        // If not, go to the next question
        dispatch(quiz.actions.goToNextQuestion());
        setAnswer(null);
        setAnswerSelected(false);
        setCounter(10);
        setTimeOver("");
      }
    }
  };

  

  return (
    <>
      {quizOver ? (
        <SummaryPage />
      ) : (
        <>
          <div className="container">
            <h1>{currentQuestion.questionText}</h1>
            <p> {counter} seconds remaining</p>
            <p>{timeOver}</p>
            <div className="answer-buttons">
              {currentQuestion.options.map((option, index) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleClick(index)}
                  value={index}
                  className={`
                ${
                  answer === index
                    ? index === correctAnswer
                      ? "correct-answer"
                      : "wrong-answer"
                    : ""
                }
                ${
                  answerSelected && index === correctAnswer
                    ? correctAnswerClass
                    : ""
                }
              `}
                  disabled={answerSelected}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="submit-button" onClick={handleAnswerSubmit}>
              submit
            </button>
            <ProgressBar
              currentQuestionIndex={currentQuestionIndex}
              quizLength={quizLength}
            />
            <img src={tacoImg} alt="taco" />
          </div>
        </>
      )}
    </>
  );
};

export default QuestionContainer;
