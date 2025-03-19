import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../assets/questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((preUserAnswers) => {
      return [...preUserAnswers, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      ></Question>
    </div>
  );
}
{
  /* <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        answersState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      ></Question>
    </div> */
}
