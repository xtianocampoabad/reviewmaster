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

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading Questions...</h1>
      </main>
    );
  }

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          📚 Review Master
        </h1>

        <p className="text-gray-500 mb-2">
          Question {currentIndex + 1} of {questions.length}
        </p>

        <h2 className="text-xl font-semibold mb-4">
          {current.question}
        </h2>

        <div className="space-y-2">

          {current.choices.map((choice, index) => {

            const letter = String.fromCharCode(65 + index);

            let color =
              "bg-blue-600 hover:bg-blue-700";

            if (showResult) {

              if (letter === current.answer) {

                color = "bg-green-600";

              } else if (letter === selectedAnswer) {

                color = "bg-red-600";

              } else {

                color = "bg-gray-400";

              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(letter)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg text-white transition ${color}`}
              >
                {choice}
              </button>
            );

          })}

        </div>

        {showResult && (
          <div className="mt-4 text-center">

            {currentIndex < questions.length - 1 ? (

              <button
                onClick={nextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Next Question →
              </button>

            ) : (

              <div>

                <h2 className="text-3xl font-bold text-green-700">
                  🎉 Review Finished!
                </h2>

                <p className="text-xl mt-4">
                  Your Score: {score} / {questions.length}
                </p>

              </div>

            )}

          </div>
        )}

      </div>
    </main>
  );
}