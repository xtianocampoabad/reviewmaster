"use client";

import useQuiz from "../hooks/useQuiz";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";
import ScoreBoard from "../components/ScoreBoard";

export default function Home() {

    const quiz = useQuiz();

    if (quiz.questions.length === 0) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Loading Questions...</h1>
    </main>
  );
}
    return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          📚 Review Master
        </h1>

        <p className="text-gray-500 mb-2">
          Question {quiz.currentIndex + 1} of {quiz.questions.length}
        </p>

        <QuestionCard question={quiz.current} />

        <div className="space-y-2">

          {quiz.current.choices.map((choice, index) => {

            const letter = String.fromCharCode(65 + index);

            let color =
              "bg-blue-600 hover:bg-blue-700";

            if (quiz.showResult) {

              if (letter === quiz.current.answer) {

                color = "bg-green-600";

              } else if (letter === quiz.selectedAnswer) {

                color = "bg-red-600";

              } else {

                color = "bg-gray-400";

              }
            }

            return (
              <AnswerButton
  key={index}
  text={choice}
  color={color}
  disabled={quiz.showResult}
  onClick={() => quiz.handleAnswer(letter)}
/>
            );

          })}

        </div>

        {quiz.showResult && (
          <div className="mt-4 text-center">

            {quiz.currentIndex < quiz.questions.length - 1 ? (

              <button
                onClick={quiz.nextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Next Question →
              </button>

            ) : (

              <div>

                <h2 className="text-3xl font-bold text-green-700">
                  🎉 Review Finished!
                </h2>

                <ScoreBoard
  score={quiz.score}
  total={quiz.questions.length}
/>

              </div>

            )}

          </div>
        )}

      </div>
    </main>
  );
}