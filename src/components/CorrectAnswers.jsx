export default function CorrectAnswers({ cards = [] }) {
  return (
    <>
      <h3 className="text-2xl font-bold text-center bg-yellow-500 py-3 px-3 rounded-tl-2xl rounded-tr-2xl">
        Correct Answers
      </h3>
      <ul className="text-base">
        {cards.map((c, index) => (
          <li
            className="bg-white p-3 rounded border-t border-t-zinc-200"
            key={c.id || index}
          >
            <p className="mb-2">
              <b>Q{index + 1}:</b> {c.question?.text || "No question text"}
            </p>
            <p className="text-yellow-700">
              <b>Answer:</b> {c.correctAnswer || "No correct answer available"}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
