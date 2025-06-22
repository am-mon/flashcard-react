import React from "react";

export default function Flashcard({ card, onAnswer, selectedAnswer, index }) {
  return (
    <>
      <div>
        <h3 className="mb-5 text-lg md:text-2xl font-bold text-center">
          Q{index + 1}. {card.question?.text}
        </h3>
        {/* {card.correctAnswer} */}
        <ul>
          {card.answers?.map((answer, i) => {
            let className =
              "bg-white hover:bg-yellow-100 mt-3 py-2 md:py-3 px-5 rounded-3xl cursor-pointer text-lg md:text-xl font-medium text-center ";

            if (selectedAnswer !== null) {
              if (answer === card.correctAnswer) {
                className += "!bg-green-500 text-white ont-bold";
              } else if (answer === selectedAnswer) {
                className += "!bg-red-500 text-white line-through";
              } else {
                className += "text-gray-500";
              }
            }

            return (
              <li
                key={i}
                onClick={() => onAnswer(answer)}
                className={className}
              >
                {answer}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
