import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    "question": "What is the main ingredient in guacamole?",
    "options": ["Tomatoes", "Avocado", "Onions", "Pineapple"],
    "correctAnswer": "Avocado"
  },
  {
    "question": "What is the key ingredient in the dish 'paella'?",
    "options": ["Chicken", "Beef", "Rice", "Pasta"],
    "correctAnswer": "Rice"
  },
  {
    "question": "Which fruit is known as the 'king of fruits' and has a strong odor?",
    "options": ["Durian", "Mango", "Banana", "Papaya"],
    "correctAnswer": "Durian"
  },
  {
    "question": "In which country did the sandwich originate?",
    "options": ["France", "Italy", "England", "United States"],
    "correctAnswer": "England"
  },
  {
    "question": "What is the main ingredient in the Indian dish 'samosa'?",
    "options": ["Potato", "Chicken", "Lamb", "Spinach"],
    "correctAnswer": "Potato"
  },
  {
    "question": "Which spice is known as 'black gold' and is native to the Maluku Islands?",
    "options": ["Cinnamon", "Turmeric", "Nutmeg", "Saffron"],
    "correctAnswer": "Nutmeg"
  },
];



const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
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
        isCorrect: question.correctAnswerIndex === answerIndex
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
    }
  }
});
