import { useSelector } from "react-redux";

export const AnswersSummary = () => {
  const answers = useSelector((state) => state.quiz.answers);
  return (
    <section>
      <h2>Review your Answers 🧐</h2>
      {answers.map((answer, index) => (
        <div key={index}>
          <p>
            Question {answer.question.id}: {answer.question.questionText}
          </p>
          {answer.isCorrect ? (
            <p style={{ color: 'green' }}>✅</p>
          ) : (
            <p style={{ color: 'red' }}>❌ Practice more!</p>
          )}
        </div>
      ))}
    </section>
  );
};