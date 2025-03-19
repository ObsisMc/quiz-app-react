import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../assets/questions.js";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => {
    return answer === QUESTIONS[index].answers[0];
  });

  const skippedPercentage = (skippedAnswers.length / QUESTIONS.length) * 100;
  const correctPercentage = (correctAnswers.length / QUESTIONS.length) * 100;
  const wrongPercentage = 100 - skippedPercentage - correctPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon"></img>
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{correctPercentage}%</span>
          <span className="text">Correct Answer</span>
        </p>
        <p>
          <span className="number">{wrongPercentage}%</span>
          <span className="text">Wrong Answer</span>
        </p>
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">Skipped Answer</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className="user-answer">{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
