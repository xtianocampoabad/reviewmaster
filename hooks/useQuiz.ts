import { useEffect, useState } from "react";
import { loadQuestions } from "../lib/excel";
import type { Question } from "../types/question";

export default function useQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadQuestions().then(setQuestions);
  }, []);

  const current = questions[currentIndex];

  function handleAnswer(choice: string) {
    if (showResult) return;

    setSelectedAnswer(choice);
    setShowResult(true);

    if (choice === current.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
    setShowResult(false);
  }

  return {
    questions,
    current,
    currentIndex,
    selectedAnswer,
    showResult,
    score,
    handleAnswer,
    nextQuestion,
  };
}