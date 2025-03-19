import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../assets/questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("answered");

      setUserAnswers((preUserAnswers) => {
        return [...preUserAnswers, answer];
      });

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 1500);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={5000}
          onTimeout={handleSkipAnswer}
        ></QuestionTimer>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        ></Answers>
      </div>
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
