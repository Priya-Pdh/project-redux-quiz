import React from "react";
import "../ProgressBar/ProgressBar.css";

const ProgressBar = ({ currentQuestionIndex, quizLength }) => {
  const progress = ((currentQuestionIndex + 1) / quizLength) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar-style">
        {
          <div
            style={{
              width: `${progress}%`,
              height: "20px",
              backgroundColor: "#ECDFD2",
              borderRadius: "10px",
            }}
          ></div>
        }
      </div>
      <h4 className="progress-number">{quizLength - currentQuestionIndex}/6</h4>
    </div>
  );
};

export default ProgressBar;
