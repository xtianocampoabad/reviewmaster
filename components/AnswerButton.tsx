interface AnswerButtonProps {
  text: string;
  color: string;
  disabled: boolean;
  onClick: () => void;
}

export default function AnswerButton({
  text,
  color,
  disabled,
  onClick,
}: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-lg text-white transition ${color}`}
    >
      {text}
    </button>
  );
}