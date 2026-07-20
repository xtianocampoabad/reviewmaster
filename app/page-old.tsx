"use client";

import { useEffect, useState } from "react";
import { loadQuestions, Question } from "../lib/excel";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadQuestions().then(setQuestions);
  }, []);
function handleAnswer(choice: string) {
  if (showResult) return;

  setSelectedAnswer(choice);
  setShowResult(true);

  if (choice === current.answer) {
    setScore(score + 1);
  }
}
  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading Questions...
        </h1>
      </main>
    );
  }

  const current = questions[currentIndex];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-xl shadow-xl p-10 w-[700px]">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          📚 Review Master
        </h1>

        <p className="text-gray-500 mb-6">
          Total Questions: {questions.length}
        </p>

        <h2 className="text-xl font-semibold mb-6">
          {current.question}
        </h2>

        <div className="space-y-3">

          {current.choices.map((choice, index) => (

<button
  key={index}
  onClick={() => handleAnswer(String.fromCharCode(65 + index))}
  disabled={showResult}
  className={`w-full p-3 rounded-lg text-white transition

  ${
    showResult
      ? String.fromCharCode(65 + index) === current.answer
        ? "bg-green-600"
        : String.fromCharCode(65 + index) === selectedAnswer
        ? "bg-red-600"
        : "bg-gray-400"
      : "bg-blue-600 hover:bg-blue-700"
  }

  `}
>
  {choice}
</button>

          ))}

        </div>

{showResult && (
  <div className="mt-6 text-center">
    {currentIndex < questions.length - 1 ? (
      <button
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer("");
          setShowResult(false);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Next Question →
      </button>
    ) : (
      <div>
        <h2 className="text-2xl font-bold text-green-700">
          🎉 Review Finished!
        </h2>

        <p className="mt-3 text-lg">
          Your Score: {score} / {questions.length}
        </p>
      </div>
    )}
  </div>
</main>
  );
}