import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../assets/questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 3000;
  let timerKey = "unselected";
  const selectAnswerWaitTime = 1000;
  const checkAnswerWaitTime = 1500;
  if (answer.selectedAnswer) {
    timer = selectAnswerWaitTime;
    timerKey = "selected";
  }
  if (answer.isCorrect !== null) {
    timer = checkAnswerWaitTime;
    timerKey = "checked";
  }

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
      }, checkAnswerWaitTime);
    }, selectAnswerWaitTime);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timerKey}
        timeout={timer}
        onTimeout={answer.selectedAnswer !== "" ? null : onSkipAnswer}
        mode={answerState}
      ></QuestionTimer>
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
