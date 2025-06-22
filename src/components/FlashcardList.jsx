import { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import CorrectAnswers from "./CorrectAnswers";
import { useNavigate } from "react-router-dom";

export default function FlashcardList({ data, reloadQuestions }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    if (!data || data.length === 0) return;

    const formattedCards = data.map((fc, i) => {
      const allAnswers = [...fc.incorrectAnswers, fc.correctAnswer];
      const shuffledAnswers = shuffleArray(allAnswers);

      return {
        id: fc.id || i,
        question: fc.question,
        correctAnswer: fc.correctAnswer,
        answers: shuffledAnswers,
      };
    });

    setCards(formattedCards);
  }, [data]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    const isCorrect = answer === cards[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < cards.length) {
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  const handleRetry = async () => {
    if (reloadQuestions) {
      await reloadQuestions();
    }
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setSelectedAnswer(null);
  };

  if (!data || data.length === 0) {
    return <p className="text-center mt-10 text-xl">No questions available.</p>;
  }

  if (finished) {
    return (
      <div>
        <h3 className="font-bold text-xl mb-8 bg-yellow-700 text-white p-3 rounded-full text-center border-4 border-yellow-500">
          Your Score: {score} / {cards.length}
        </h3>
        <CorrectAnswers cards={cards} />
        <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-2">
          <button
            onClick={handleRetry}
            className="bg-yellow-700 text-white hover:bg-yellow-900 p-3 px-7 text-lg font-medium rounded-full cursor-pointer"
          >
            Load New Questions
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-700 text-white hover:bg-yellow-900 p-3 px-7 text-lg font-medium rounded-full cursor-pointer"
          >
            Select Another Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* {cards?.map((card) => (
        <Flashcard key={card.id} card={card} onAnswer={handleAnswer} />
      ))} */}
      <h3 className="inline-block mx-auto mb-7 py-2 px-5 font-bold text-xl bg-yellow-700 text-white rounded-full text-center border-4 border-yellow-500">
        Current Score: {score} / {cards.length}
      </h3>
      <div className="bg-yellow-500 p-10 px-6 md:py-15 md:px-10 rounded-2xl">
        {cards.length > 0 && (
          <Flashcard
            key={cards[currentIndex].id}
            card={cards[currentIndex]}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            index={currentIndex}
          />
        )}
      </div>
    </div>
  );
}
