import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quiz } from "./reducers/quiz";
import { SummaryPage } from "./Page/SummaryPage/SummaryPage";
// import { CurrentQuestion } from "./components/CurrentQuestion";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const reducer = combineReducers({
  quiz: quiz.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionContainer />} />
          {/* <CurrentQuestion /> */}
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
