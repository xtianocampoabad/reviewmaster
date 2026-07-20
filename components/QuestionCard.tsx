import { Question } from "../types/question";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({
  question,
}: QuestionCardProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {question.question}
      </h2>
    </>
  );
}