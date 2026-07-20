interface ScoreBoardProps {
  score: number;
  total: number;
}

export default function ScoreBoard({
  score,
  total,
}: ScoreBoardProps) {
  return (
    <p className="text-xl mt-4">
      Your Score: <strong>{score}</strong> / {total}
    </p>
  );
}