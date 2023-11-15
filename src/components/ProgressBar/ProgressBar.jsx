import React from "react";

const ProgressBar = ({ currentQuestionIndex, quizLength }) => {
  const progress = ((currentQuestionIndex + 1) / quizLength) * 100;

  return (
    <div style={{ width: "100%", backgroundColor: "#ddd" }}>
      {
        <div
          style={{
            width: `${progress}%`,
            height: "20px",
            backgroundColor: "#4caf50",
          }}
        ></div>
      }
    </div>
  );
};

export default ProgressBar;
