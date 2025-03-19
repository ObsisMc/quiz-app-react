import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../assets/questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: "answered",
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 500);
    }, 500);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer timeout={2000} onTimeout={onSkipAnswer}></QuestionTimer>
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      ></Answers>
    </div>
  );
}
