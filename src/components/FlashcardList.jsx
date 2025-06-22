import { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { getAllQuestions } from "../api/trivia-api";
import CorrectAnswers from "./CorrectAnswers";

export default function FlashcardList() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllQuestions();
      console.log(data);

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
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

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

  if (finished) {
    return (
      <div>
        <h3 className="font-bold text-xl mb-8 bg-yellow-700 text-white p-3 rounded-full text-center border-4 border-yellow-500">
          Your Score: {score}/ {cards.length}
        </h3>
        <CorrectAnswers cards={cards} />
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setFinished(false);
            setSelectedAnswer(null);
            fetchData();
          }}
          className="mt-7 bg-black text-white hover:bg-yellow-800 p-3 px-7 text-lg font-medium rounded-full mx-auto block cursor-pointer"
        >
          Start New Quiz
        </button>
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
