import { createSlice } from "@reduxjs/toolkit";

const questions = [
  {
    id: 1,
    questionText: "What is the main ingredient in guacamole?",
    options: ["Tomatoes", "Avocado", "Onions", "Pineapple"],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    questionText: "What is the key ingredient in the dish 'paella'?",
    options: ["Chicken", "Beef", "Rice", "Pasta"],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    questionText:
      "Which fruit is known as the 'king of fruits' and has a strong odor?",
    options: ["Durian", "Mango", "Banana", "Papaya"],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    questionText: "In which country did the sandwich originate?",
    options: ["France", "Italy", "England", "United States"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText: "What is the main ingredient in the Indian dish 'samosa'?",
    options: ["Potato", "Chicken", "Lamb", "Spinach"],
    correctAnswerIndex: 0,
  },
  {
    id: 6,
    questionText:
      "Which spice is known as 'black gold' and is native to the Maluku Islands?",
    options: ["Cinnamon", "Turmeric", "Nutmeg", "Saffron"],
    correctAnswerIndex: 2,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  quizStartTime: null,
  quizEndTime: null, 
  totalTime: 0,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state) => {
      // Record quiz start time if it's the first question
      if (state.currentQuestionIndex === 0 && state.answers.length === 0) {
        state.quizStartTime = new Date().getTime();
      }
    },
    
    endQuiz: (state) => {
      // Record quiz end time when the summary page is rendered
      state.quizEndTime = new Date().getTime();
    },
    calculateTimeDifference: (state) => {
      if (state.quizStartTime && state.quizEndTime) {
        const totalTimeInSeconds = (state.quizEndTime - state.quizStartTime) / 1000;
        
        // Calculate minutes and seconds
        const minutes = Math.floor(totalTimeInSeconds / 60);
        const seconds = Math.round(totalTimeInSeconds % 60);

        // Update totalTime with formatted string
        state.totalTime = `${minutes} mins ${seconds} secs`;
      }
    },
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });

     
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },
   
    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});

export const {
  startQuiz,
  submitAnswer,
  goToNextQuestion,
  restart,
  endQuiz, calculateTimeDifference 
} = quiz.actions;
export default quiz.reducer;
